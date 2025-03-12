"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import {
  YoutubeIcon,
  Sparkles,
  MessageSquare,
  Share2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import sendChatMessage from "@/utils/gemeni";
import { getTranscript } from "@/actions/FetchTranscript";
import { Alert } from "@/components/ui/alert";

export default function Home() {
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b backdrop-blur-md sticky top-0 z-50 glass">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-primary rounded-full blur opacity-70"></div>
              <div className="relative bg-background rounded-full p-1">
                <YoutubeIcon className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <h1 className="text-xl font-bold tracking-tight">YT Summarizer</h1>
          </Link>
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '3xl', textAlign: 'center', marginBottom: '12' }} 
        >
          <h2 className="text-5xl font-bold tracking-tight mb-4">
            <span className="text-gradient-primary">Summarize</span> YouTube
            Videos <span className="text-gradient-secondary">Instantly</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered summaries and insights from any YouTube video in
            seconds
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ width: '100%', maxWidth: '2xl' }}
        >
          <Card className="p-8 shadow-xl border-2 border-primary/10 glass">
            <div className="space-y-6">
              <YoutubeInput />

              <div className="text-center text-sm text-muted-foreground">
                <p>Paste any YouTube URL to get started</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="mt-24 w-full max-w-4xl">
          <h3 className="text-2xl font-bold text-center mb-8">
            Unlock the power of video content
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Smart Summaries"
              description="Get detailed point-by-point summaries of any YouTube video"
              delay={0.3}
            />
            <FeatureCard
              icon={<MessageSquare className="h-5 w-5" />}
              title="Ask Questions"
              description="Chat with AI about the video content to get deeper insights"
              delay={0.4}
            />
            <FeatureCard
              icon={<Share2 className="h-5 w-5" />}
              title="Save & Share"
              description="Export summaries as PDFs or share them on social media"
              delay={0.5}
            />
          </div>
        </div>
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 YT Summarizer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function YoutubeInput() {
  "use client";

  const fetchTranscript = async (id:string) => {
    try {
      return await getTranscript(id);
    } catch (e) {
      return null;
    }
  };

  const router = useRouter();
  const [chatData, setchatData] = useState();
  const [url, setUrl] = useState("");

  async function fetchData(input: any) {
    try {
      console.log("Generating data...");
      const transcript = await fetchTranscript(input);
      console.log(transcript)
      let data = "";
      if(transcript){

        data = await sendChatMessage(transcript);
      }
      else {
        alert("No transcript available for this video.");
        return;
      }

      // Remove triple backticks and any JSON declaration
      data = data.replace(/```json|```/g, "").trim();

      // Remove trailing commas in JSON structures (fixes common JSON errors)
      data = data.replace(/,\s*([\]}])/g, "$1");
      data = JSON.parse(data);
      data['videourl'] = input;
      data = JSON.stringify(data);
      router.push(`/summary?data=${encodeURIComponent(data)}`);
      console.log("Raw Data:", data);

      // Validate JSON before parsing
      let jsonData;
      try {
        jsonData = JSON.parse(data);
        console.log("Parsed JSON:", jsonData);
      } catch (jsonError) {
        console.error("JSON Parsing Error:", jsonError);
        return;
      }
    } catch (e) {
      console.error("Error occurred:", e);
    }
  }

  useEffect(() => {
    console.log(chatData);
  }, [chatData]);

  const [isFocused, setIsFocused] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    // Encode the URL to pass it safely in the query parameter
    const encodedUrl = encodeURIComponent(url);
    window.location.href = `/summary?url=${encodedUrl}`;
  };

  return (
    <div  className="relative">
      <div
        className={`relative transition-all duration-300 ${
          isFocused ? "scale-[1.02]" : ""
        }`}
      >
        <div className="absolute -inset-0.5 bg-gradient-primary rounded-lg blur opacity-30"></div>
        <div className="relative bg-background rounded-lg">
          <div className="flex flex-col sm:flex-row gap-3 p-1">
            <div className="flex-1 flex items-center relative">
              <YoutubeIcon className="absolute left-3 h-5 w-5 text-red-600" />
              <Input
                type="text"
                placeholder="Paste YouTube URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="pl-10 h-12 border-0 shadow-none focus-visible:ring-0 bg-transparent"
              />
            </div>
            <Button
              onClick={() => {
                //  console.log(chatData)
                fetchData(url);
              }}
              type="submit"
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-white font-medium h-12 px-6"
            >
              <span>Generate Summary</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
     
    >
      <Card className="p-6 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl border-2 border-primary/5 group-hover:border-primary/20 glass">
        <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </Card>
    </motion.div>
  );
}
