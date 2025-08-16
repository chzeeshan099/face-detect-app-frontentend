import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyBNAYmp-Yqtso3bNh2IvmhI-hZmPx3X5mg";

export const getVideosByMood = async (mood) => {
  const moodMap = {
    happy: 'happy Indian Punjabi song 2024',
    sad: 'sad Indian Punjabi song 2024',
    angry: 'workout Indian Punjabi song 2024',
    neutral: 'chill Indian Punjabi song 2024',
    surprised: 'trending Indian Punjabi song 2024',
    fearful: 'calm Indian Punjabi song 2024',
  };
  const query = moodMap[mood] || 'Indian Punjabi song';

  const url = "https://www.googleapis.com/youtube/v3/search";
  const params = {
    part: "snippet",
    q: query,
    type: "video",
    maxResults: 10,
    key: YOUTUBE_API_KEY,
  };
  const response = await axios.get(url, { params });
  return response.data.items;
};