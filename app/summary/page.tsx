"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"
import { YoutubeIcon, FileText, MessageSquare, Download, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { ChatInterface } from "@/components/chat-interface"
import { ShareButtons } from "@/components/share-buttons"
import YouTubePlayer from "@/components/YoutubePlayer"

export default function SummaryPage() {
  const searchParams = useSearchParams()
  const url = searchParams.get("url")

  const data = searchParams.get("data");
  console.log(data);
  const [loading, setLoading] = useState(true)
  const [videoData, setVideoData] = useState<any>(null)


  useEffect(() => {
    // Simulate loading video data
    const timer = setTimeout(() => {
      if (data) {
        setVideoData(JSON.parse(data));
      }
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [data]);



  // useEffect(() => {
  //   // Simulate loading video data
  //   const timer = setTimeout(() => {
  //     setVideoData({
  //       title: "How to Build a Next.js App with AI Integration",
  //       thumbnail: "/placeholder.svg?height=720&width=1280",
  //       duration: "15:42",
  //       channel: "Tech Tutorials",
  //       summary: [
  //         "Next.js provides a powerful framework for building modern web applications with React.",
  //         "AI integration can be achieved using various APIs like OpenAI or Hugging Face.",
  //         "Server components in Next.js 13+ allow for efficient data fetching and processing.",
  //         "Tailwind CSS makes styling responsive applications straightforward and maintainable.",
  //         "Vercel AI SDK simplifies the process of building AI-powered applications.",
  //         "Streaming responses provide a better user experience for AI-generated content.",
  //       ],
  //       takeaways: [
  //         "Use the App Router for better organization of your Next.js project.",
  //         "Implement proper error handling for AI API calls.",
  //         "Consider rate limiting to manage API costs.",
  //         "Optimize for mobile users with responsive design principles.",
  //       ],
  //     })
  //     setLoading(false)
  //   }, 2000)

  //   return () => clearTimeout(timer)
  // }, [url])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 max-w-md glass">
          <h2 className="text-xl font-bold mb-4">No YouTube URL provided</h2>
          <p className="mb-4">Please provide a YouTube URL to generate a summary.</p>
          <Button asChild className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Link href="/">Go Back Home</Link>
          </Button>
        </Card>
      </div>
    )
  }

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
            <h1 className="text-xl font-bold tracking-tight">SummarEase</h1>
          </Link>
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-4 group">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </Button>

        {loading ? (
          <LoadingState />
        ) : (
          <div className="space-y-8">
            <VideoHeader videoData={videoData} />

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-1 glass">
                <TabsTrigger
                  value="summary"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
                >
                  <FileText className="h-4 w-4" />
                  Summary
                </TabsTrigger>
                <TabsTrigger
                  value="qa"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-secondary data-[state=active]:text-white"
                >
                  <MessageSquare className="h-4 w-4" />
                  Q&A
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-6">
                <SummaryContent videoData={videoData} />
              </TabsContent>

              <TabsContent value="qa" className="mt-6">
                <ChatInterface videoTitle={videoData.title} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 YT Summarizer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-6">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-primary rounded-full blur opacity-30 animate-pulse"></div>
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin relative"></div>
      </div>
      <div className="text-center">
        <p className="text-xl font-medium mb-2">Generating summary...</p>
        <p className="text-sm text-muted-foreground">Our AI is analyzing the video content</p>
      </div>
    </div>
  )
}

function VideoHeader({ videoData }: { videoData: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', height: '50%' }}
    >
       <YouTubePlayer videoUrl={videoData?.videourl} /> 
      {/* <div className="md:col-span-1">
        <div className="aspect-video rounded-xl overflow-hidden bg-muted relative group">
          <div className="absolute -inset-1 bg-gradient-primary rounded-xl blur opacity-30 transition-opacity group-hover:opacity-50"></div>
          <div className="relative h-full">
            <img
              src={videoData.thumbnail || "/placeholder.svg"}
              alt={videoData.title}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
              {videoData.duration}
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-3">{videoData.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="bg-primary/10 px-3 py-1 rounded-full">{videoData.channel}</span>
          <span>{videoData.duration}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="flex items-center gap-2 glass hover:bg-primary/10 transition-colors">
            <Download className="h-4 w-4" />
            Save as PDF
          </Button>
          <ShareButtons />
        </div>
      </div> */}
    </motion.div>
  )
}

function SummaryContent({ videoData }: { videoData: any }) {
  return (
    <div className="space-y-8">
      <Card className="p-8 shadow-lg glass">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold">Summary</h2>
        </div>
        <ul className="space-y-6">
          {videoData.summary.map((point: string, index: number) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ display: 'flex', gap: '1rem' }}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div className="pt-1">
                <p className="text-base">{point}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Card>

      <Card className="p-8 shadow-lg relative overflow-hidden glass">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-accent"></div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold">Key Takeaways</h2>
        </div>
        <ul className="space-y-4">
          {videoData.takeaways.map((takeaway: string, index: number) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              style={{ display: 'flex', gap: '1rem', backgroundColor: 'rgba(191, 219, 254, 0.05)', padding: '1rem', borderRadius: '0.5rem' }}
            >
              <span className="text-gradient-accent font-bold">•</span>
              <p>{takeaway}</p>
            </motion.li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

