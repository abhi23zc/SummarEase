"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50])

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Content Creator",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "VideoSumm AI has completely transformed how I research for my videos. I can quickly get the key points from hours of content in minutes.",
      stars: 5,
    },
    {
      name: "Sarah Chen",
      role: "Student",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "As a student, this tool is invaluable. I can quickly understand lecture videos and ask questions about specific topics I don't understand.",
      stars: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "We use VideoSumm AI to keep track of competitor content and industry trends. It's saved our team countless hours of video watching.",
      stars: 4,
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(120,119,198,0.15),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(120,119,198,0.05),transparent_70%)]"></div>

      <motion.div style={{ opacity, y }} className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-4 inline-block"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-[800px] mx-auto"
          >
            Join thousands of satisfied users who are saving time and getting more value from video content.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              <motion.div
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="h-full border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-lg overflow-hidden">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>

                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center mb-4">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-6">"{testimonial.content}"</p>

                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3 border-2 border-white dark:border-gray-800">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

