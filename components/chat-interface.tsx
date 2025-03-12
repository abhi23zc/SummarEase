"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { SendIcon, BotIcon, UserIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { sendQA } from "@/utils/gemeni"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  complete?: boolean
}

export function ChatInterface({ videoTitle }: { videoTitle: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi there! I'm your AI assistant. Ask me any questions about video and I'll try to answer based on the video content.`,
      complete: true,
    },
    
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function fetchData(input: any) {
    try {
      console.log("Generating data...");
      let data = await sendQA(input)
    
      data = data.replace(/```json|```/g, '').trim();
    
      data = data.replace(/,\s*([\]}])/g, '$1');
      console.log("Raw Data:", data);

      let jsonData;
      try {
        jsonData = JSON.parse(data);
        return jsonData

      } catch (jsonError) {
        console.log("JSON Parsing Error:", jsonError);
        return;
      }
      
    } catch (e) {
      console.log("Error occurred:", e);
    }
    
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      complete: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const assistantMessageId = (Date.now() + 1).toString()
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      complete: false,
    }

    setMessages((prev) => [...prev, assistantMessage])


    try{

      const content = await fetchData(input)
      
      setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content : content?.answer } : msg)))
      setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, complete: true } : msg)))
    }catch(e){
      console.error("Error in sending QA", e)
      setIsLoading(false)
      return
    }

   
    

    setIsLoading(false)
  }

  return (
    <Card className="flex flex-col h-[600px] max-h-[70vh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ justifyContent: message.role === "user" ? "flex-end" : "flex-start" }}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className={`h-8 w-8 ${message.role === "assistant" ? "bg-primary/20" : "bg-secondary"}`}>
                  {message.role === "assistant" ? <BotIcon className="h-4 w-4" /> : <UserIcon className="h-4 w-4" />}
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  {!message.complete && (
                    <div className="mt-1 flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-current opacity-60 animate-bounce"></div>
                      <div
                        className="h-2 w-2 rounded-full bg-current opacity-60 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-current opacity-60 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the video..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}

