import * as faceapi from 'face-api.js';

export const loadModels = async () => {
  const MODEL_URL = '/models';
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
};

export const detectEmotion = async (imageElement) => {
  const detection = await faceapi
    .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions();
  if (detection && detection.expressions) {
    const sorted = Object.entries(detection.expressions).sort((a, b) => b[1] - a[1]);
    return sorted[0][0];
  }
  return 'neutral';
};