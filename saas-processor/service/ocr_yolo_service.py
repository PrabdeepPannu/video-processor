"""
A Flask microservice for detecting player jersey numbers in sports video frames using PaddleOCR.
It extracts bounding boxes around jersey numbers, computes per-player appearance duration (in seconds),
average on-screen size, maximum on-screen size (largest bounding box ratio),
then calculates a prominence score as `duration * avg_size`.

Configuration:
    FRAME_INTERVAL: sample every Nth frame (default 30).
    DEINTERLACE: toggle deinterlacing on/off (default True).
"""
import logging
import os
import sys
import signal
from tempfile import NamedTemporaryFile

from flask import Flask, request, jsonify
import cv2
import numpy as np
from paddleocr import PaddleOCR

# ----------------------------------------------------------------------------
# App Configuration
# ----------------------------------------------------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logging.getLogger("ppocr").setLevel(logging.ERROR)

app = Flask(__name__)
# Adjust OCR thresholds for better sensitivity
ocr = PaddleOCR(
    use_angle_cls=False,
    lang='en',
    show_log=False,
    use_gpu=False,
    det_db_thresh=0.2,  # Lower threshold to detect more text
    det_db_box_thresh=0.5  # Adjust box threshold
)

FRAME_INTERVAL = 10  # Default sample every Nth frame
DEINTERLACE = True   # Default deinterlacing enabled

signal.signal(signal.SIGTERM, lambda *args: sys.exit(0))

# ----------------------------------------------------------------------------
# Helper Functions
# ----------------------------------------------------------------------------

def deinterlace_frame(frame: np.ndarray) -> np.ndarray:
    even = frame[0::2]
    odd = frame[1::2]
    blended = cv2.addWeighted(even, 0.5, odd, 0.5, 0)
    result = frame.copy()
    result[0::2] = blended
    result[1::2] = blended
    return result

def sharpen_image(image: np.ndarray) -> np.ndarray:
    kernel = np.array([[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]])
    return cv2.filter2D(image, -1, kernel)

def compute_prominence_score(duration: float, avg_size: float) -> float:
    return duration * avg_size

def bbox_size_ratio(box_pts: list, frame_shape: tuple) -> float:
    xs = [pt[0] for pt in box_pts]
    ys = [pt[1] for pt in box_pts]
    w = max(xs) - min(xs)
    h = max(ys) - min(ys)
    frame_h, frame_w = frame_shape[:2]
    return (w * h) / (frame_w * frame_h) if frame_w * frame_h else 0.0

def respond(payload: dict = None, error_msg: str = None):
    status = 200 if error_msg is None else 400
    body = {
        'success': error_msg is None,
        'data': payload if error_msg is None else None,
        'error': error_msg
    }
    return jsonify(body), status

# ----------------------------------------------------------------------------
# Video Detection Endpoint
# ----------------------------------------------------------------------------
@app.route('/detect', methods=['POST'])
def detect():
    """
    POST endpoint to process uploaded video and return player prominence.
    Expects 'video' file in request, optional 'frame_interval' and 'deinterlace' parameters.
    """
    file = request.files.get('video')
    if not file:
        return respond(error_msg='No video provided')

    # Get configurable parameters from request
    frame_interval = int(request.form.get('frame_interval', FRAME_INTERVAL))
    deinterlace = request.form.get('deinterlace', str(DEINTERLACE)).lower() == 'true'

    players = {}
    frame_count = 0
    temp = NamedTemporaryFile(delete=False, suffix='.mp4')
    try:
        temp.write(file.read())
        temp.close()
        cap = cv2.VideoCapture(temp.name)
        if not cap.isOpened():
            return respond(error_msg='Cannot open video')

        fps = cap.get(cv2.CAP_PROP_FPS) or 30
        seconds_per_sample = frame_interval / fps

        while True:
            ret, frame = cap.read()
            if not ret:
                break
            frame_count += 1
            if frame_count % frame_interval != 0:
                continue

            if deinterlace:
                frame = deinterlace_frame(frame)

            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            ocr_input = np.ascontiguousarray(rgb)  # Use color image for OCR

            try:
                ocr_output = ocr.ocr(ocr_input)
            except Exception:
                # Try sharpened image instead of resizing
                sharpened = sharpen_image(ocr_input)
                try:
                    ocr_output = ocr.ocr(sharpened)
                except Exception as e:
                    logger.warning(f"OCR failed at frame {frame_count}: {e}")
                    continue

            if not isinstance(ocr_output, list):
                continue
            for line in ocr_output:
                if not line:
                    continue
                for entry in line:
                    if not entry or len(entry) < 2:
                        continue
                    text = entry[1][0]
                    if not text.isdigit():
                        continue
                    jersey = text
                    box_pts = entry[0]
                    size_ratio = bbox_size_ratio(box_pts, frame.shape)

                    if jersey not in players:
                        players[jersey] = {
                            'in_point': frame_count,
                            'out_point': frame_count,
                            'duration': seconds_per_sample,
                            'size_sum': size_ratio,
                            'max_size': size_ratio,
                            'count': 1,
                            'last_seen': frame_count
                        }
                    else:
                        rec = players[jersey]
                        # Update duration based on gap since last detection
                        if frame_count - rec['last_seen'] <= frame_interval:
                            rec['duration'] = (frame_count - rec['in_point']) / fps
                        else:
                            rec['duration'] += seconds_per_sample
                        rec['out_point'] = frame_count
                        rec['size_sum'] += size_ratio
                        rec['max_size'] = max(rec['max_size'], size_ratio)
                        rec['count'] += 1
                        rec['last_seen'] = frame_count

        cap.release()

        output = {}
        for jersey, rec in players.items():
            avg_size = rec['size_sum'] / rec['count'] if rec['count'] else 0.0
            prominence = compute_prominence_score(rec['duration'], avg_size)
            output[jersey] = {
                'in_point': rec['in_point'],
                'out_point': rec['out_point'],
                'duration': round(rec['duration'], 2),
                'avg_size': round(avg_size, 4),
                'max_size': round(rec['max_size'], 4),
                'prominence_score': round(prominence, 4)
            }

        logger.info(f"Processed {frame_count} frames, detected {len(output)} players.")
        return respond(payload=output)

    finally:
        try:
            os.remove(temp.name)
        except Exception:
            pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)