// Type definitions for the emotion API
export interface EmotionResult {
  dominant_emotion: string;
  all_emotions: {
    [key: string]: number;
  };
}
