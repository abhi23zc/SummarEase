"use client";

import React, { useState, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

// Function to extract video ID from any YouTube URL
const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?m\.youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url?.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

interface YouTubePlayerProps {
  videoUrl: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoUrl }) => {
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    const id = extractVideoId(videoUrl);
    setVideoId(id);
  }, [videoUrl]);

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      controls: 1,
      fs: 1,
    },
  };

  if (!videoId) {
    return <p className="text-red-500 text-center">Invalid YouTube URL</p>;
  }

  return (
    <div className="w-full mx-auto p-4 h-full">
      <YouTube videoId={videoId} opts={opts} className="rounded-lg shadow-lg" />
    </div>
  );
};

export default YouTubePlayer;
