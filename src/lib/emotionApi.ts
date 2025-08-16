// Helper function to convert data URL to blob
const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');
  const mimeMatch = arr[0]?.match(/:(.*?);/);
  const mime = mimeMatch && mimeMatch[1] ? mimeMatch[1] : 'application/octet-stream';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

// Define the emotion result type
export interface EmotionResult {
  dominant_emotion: string;
  all_emotions: {
    [key: string]: number;
  };
}

// Function to analyze face emotion using backend API
export const analyzeEmotionBackend = async (
  imageData: string
): Promise<EmotionResult> => {
  try {
    // Make API call to backend
    const response = await fetch('http://localhost:5000/analyze-emotion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageData,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result as EmotionResult; // Contains dominant_emotion and all_emotions
  } catch (error) {
    console.error('Error analyzing emotion:', error);
    throw error;
  }
};
