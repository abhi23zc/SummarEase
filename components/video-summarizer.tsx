"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, MessageSquare, FileText, Copy } from "lucide-react"

export default function VideoSummarizer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("summary")
  const [isProcessing, setIsProcessing] = useState(false)
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ")

  const controls = useAnimation()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 0.5, 100))
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, progress])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setProgress(0)
    setTimeout(() => {
      setIsProcessing(false)
      setIsPlaying(true)
    }, 1500)
  }

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    })
  }, [controls])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      style={{ pointerEvents: 'none', filter: 'blur(2px)' }}
      className="select-none"
    >
      <Card className="overflow-hidden border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl rounded-2xl">
        <CardContent className="p-0">
          <div className="relative bg-gray-900 aspect-video">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <motion.img
                src="/placeholder.svg?height=360&width=640"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
              <motion.div className="absolute z-10">
                <Button
                  size="icon"
                  className="h-16 w-16 rounded-full bg-violet-600/90 text-white shadow-lg"
                  disabled
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Paste YouTube URL"
                  value={videoUrl}
                  disabled
                  className="flex-1 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-50"
                />
                <Button
                  type="submit"
                  disabled
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white opacity-50"
                >
                  Summarize
                </Button>
              </div>
            </form>

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800/50">
                <TabsTrigger value="summary" disabled className="opacity-50">
                  <FileText className="h-4 w-4" /> Summary
                </TabsTrigger>
                <TabsTrigger value="qa" disabled className="opacity-50">
                  <MessageSquare className="h-4 w-4" /> Q&A
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
