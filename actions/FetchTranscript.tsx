import axios from "axios";

export const getTranscript = async (videoId: string) => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+"/get_transcript", {
      video_id: videoId,
    });
    
    return response.data.transcript; // Return the transcript
  } catch (error: any) {
    console.error("Error fetching transcript:", error.response?.data || error.message);
    return null;
  }
};
