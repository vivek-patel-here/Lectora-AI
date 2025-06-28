import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

export const fetchYoutubeVideo = async (topic) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      topic
    )}&type=video&maxResults=5&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data =await  response.json();

    const videoIds = data.items.map((item) => {
      return item.id.videoId;
    });

    return videoIds||[];
};
