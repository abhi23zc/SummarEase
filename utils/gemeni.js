
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});

export default async function sendChatMessage(transcript) {


  let result = await chat.sendMessage(`Analyze the following YouTube video transcript and generate a structured JSON output with the following details:
- **Title**: The name of the video.
- **Thumbnail**: The YouTube video’s thumbnail URL (or a placeholder if not available).
- **Duration**: The video’s length in MM:SS format.
- **Channel**: The name of the YouTube channel.
- **Summary**: A bullet-point list of the main points covered in the video.
- **Takeaways**: A list of actionable insights or key lessons from the video.

Ensure the output follows this JSON structure:
{
  "title": "Video Title",
  "thumbnail": "Thumbnail URL",
  "duration": "MM:SS",
  "channel": "Channel Name",
  "summary": [
    "Point 1 about the video",
    "Point 2 about the video",
    "Point 3 about the video",
    "Point 4 about the video",
    "Point 5 about the video",
    "Point 6 about the video",
    "Point 7 about the video",
    "Point 8 about the video",
    "Point 9 about the video",
    "Point 10 about the video",
  ],
  "takeaways": [
    "Takeaway 1",
    "Takeaway 2",
    "Takeaway 3",
    "Takeaway 4",
    "Takeaway 5"
    "Takeaway 7"
    "Takeaway 8"
  ]
}

Now, process the following transcript and generate the JSON output don't add a single word at your own just give me json output: 
${transcript}
`);
  return (result.response.text());
}

export async function sendQA(question) {
  let result = await chat.sendMessage(`
        Now, answer the user's question **ONLY** based on this video. If the video does not contain relevant information, say "This video does not cover that topic."

User's Question: ${question}

Provide a clear, factual, and concise answer based on the video. 
Now,Generate the JSON output in this format don't add a single word at your own just give me json output: 
{
  "answer": "Answer Text"
}
`);
  return (result.response.text());
}7