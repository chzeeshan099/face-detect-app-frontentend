import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  return (
    <div className="flex flex-col items-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        videoConstraints={videoConstraints}
        className="rounded-xl border-2 border-purple-200 shadow-md"
      />
      <button
        onClick={capture}
        className="mt-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 px-6 py-2 text-lg font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105"
      >
        Capture Photo
      </button>

      {/* {capturedImage && (
        <div className="mt-4">
          <h3>Captured Image:</h3>
          <img src={capturedImage} alt="Captured" width="400" />
        </div>
      )} */}
    </div>
  );
};

export default WebcamCapture;
