// Helper function to convert data URL to blob
const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
};

/**
 * @typedef {Object} EmotionResult
 * @property {string} dominant_emotion - The main detected emotion
 * @property {Object.<string, number>} all_emotions - Object containing all detected emotions and their confidence levels
 */

// Function to analyze face emotion using backend API
export const analyzeEmotionBackend = async (imageData) => {
    try {
        // Make API call to backend
        const response = await fetch('http://localhost:5000/analyze-emotion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: imageData
            })
        }); if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        try {
            const result = await response.json();
            return result; // Contains dominant_emotion and all_emotions
        } catch (jsonError) {
            console.error('Error parsing JSON response:', jsonError);
            console.log('Response text:', await response.text());

            // Return a fallback result with a default emotion
            return {
                dominant_emotion: 'neutral',
                all_emotions: {
                    neutral: 1.0,
                    happy: 0.0,
                    sad: 0.0,
                    angry: 0.0,
                    fear: 0.0,
                    surprise: 0.0,
                    disgust: 0.0
                }
            };
        }
    } catch (error) {
        console.error('Error analyzing emotion:', error);
        throw error;
    }
};
