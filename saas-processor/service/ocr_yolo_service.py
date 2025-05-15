import logging
import os
import sys
import signal
from tempfile import NamedTemporaryFile

from flask import Flask, request, jsonify
import cv2
from paddleocr import PaddleOCR

# ----------------------------------------------------------------------------
# Configuration and Initialization
# ----------------------------------------------------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
ocr = PaddleOCR(use_angle_cls=True, lang='en', show_log=False, use_gpu=False)
FRAME_INTERVAL = 30  # process every 30th frame

signal.signal(signal.SIGTERM, lambda *args: sys.exit(0))

# ----------------------------------------------------------------------------
# Helper Functions
# ----------------------------------------------------------------------------
def compute_prominence_score(duration: int, max_size: float) -> float:
    return duration * max_size


def frame_size_ratio(frame) -> float:
    h, w = frame.shape[:2]
    return max(h, w) / (h * w) * 100


def respond(payload=None, error_msg=None):
    return jsonify({
        'success': error_msg is None,
        'data': payload if error_msg is None else None,
        'error': error_msg
    })

# ----------------------------------------------------------------------------
# Main Endpoint
# ----------------------------------------------------------------------------
@app.route('/detect', methods=['POST'])
def detect():
    file = request.files.get('video')
    if not file:
        return respond(error_msg='No video provided')

    players = {}
    frame_count = 0

    temp_file = NamedTemporaryFile(delete=False, suffix='.mp4')
    try:
        temp_file.write(file.read())
        temp_file.close()
        logger.info(f"Video saved: {temp_file.name}")

        cap = cv2.VideoCapture(temp_file.name)
        if not cap.isOpened():
            return respond(error_msg='Cannot open video')

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            frame_count += 1
            if frame_count % FRAME_INTERVAL != 0:
                continue

            try:
                ocr_result = ocr.ocr(frame, cls=True)
            except Exception as e:
                logger.warning(f"OCR error at frame {frame_count}: {e}")
                continue

            if not ocr_result or not isinstance(ocr_result, list):
                continue

            for line in ocr_result:
                if line is None:
                    logger.warning("Received None for 'line'")
                    continue
                for entry in line:
                    if len(entry) < 2:
                        continue
                    text = entry[1][0]
                    if not text.isdigit():
                        continue

                    jersey = text
                    size_metric = frame_size_ratio(frame)

                    if jersey not in players:
                        players[jersey] = {
                            'in_point': frame_count,
                            'out_point': frame_count,
                            'duration': FRAME_INTERVAL,
                            'max_size': size_metric
                        }
                    else:
                        rec = players[jersey]
                        rec['out_point'] = frame_count
                        rec['duration'] += FRAME_INTERVAL
                        rec['max_size'] = max(rec['max_size'], size_metric)

        cap.release()

        output = {}
        for jersey, rec in players.items():
            prominence = compute_prominence_score(rec['duration'], rec['max_size'])
            output[jersey] = {
                'in_point': rec['in_point'],
                'out_point': rec['out_point'],
                'max_size': rec['max_size'],
                'duration': rec['duration'],
                'prominence_score': prominence
            }

        logger.info(f"Frames processed: {frame_count}, players found: {len(output)}")
        return respond(payload=output)

    finally:
        try:
            os.remove(temp_file.name)
            logger.info(f"Cleaned up: {temp_file.name}")
        except OSError as e:
            logger.warning(f"Failed to delete temp file: {e}")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
