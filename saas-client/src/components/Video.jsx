// src/components/Video.jsx
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref }    from "firebase/storage";
import { storage }                from "../utils/firebase";

const Video = ({ srcOrPath }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError]       = useState(null);

  useEffect(() => {
    
    if (!srcOrPath) {
      setError("No video source provided");
      return;
    }

    if (srcOrPath.startsWith("http://") || srcOrPath.startsWith("https://")) {
      setVideoUrl(srcOrPath);
      return;
    }

    const normalized = srcOrPath.replace(/^\/+/, "");
    const r = ref(storage, normalized);
    getDownloadURL(r)
      .then(setVideoUrl)
      .catch((err) => {
        console.error("getDownloadURL failed:", err);
        setError("Could not load video from Storage path.");
      });
  }, [srcOrPath]);

  if (error)    return <div className="text-red-500">{error}</div>;
  if (!videoUrl) return <div>Loading video…</div>;

  return (
    <video width="100%" controls src={videoUrl}>
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
