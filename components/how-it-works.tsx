"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Youtube, Sparkles, MessageCircle } from "lucide-react"

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])

  const steps = [
    {
      icon: <Youtube className="h-8 w-8 text-white" />,
      title: "Paste YouTube URL",
      description: "Simply copy and paste the URL of any YouTube video you want to summarize.",
      color: "bg-gradient-to-br from-red-500 to-red-600",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-white" />,
      title: "AI Processes Video",
      description: "Our advanced AI analyzes the video content, transcribes speech, and identifies key points.",
      color: "bg-gradient-to-br from-violet-500 to-violet-600",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-white" />,
      title: "Get Summary & Ask Questions",
      description: "Review the concise summary and ask specific questions about the video content.",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.15),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.05),transparent_70%)]"></div>

      <motion.div style={{ opacity, scale }} className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-4 inline-block"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-[800px] mx-auto"
          >
            Get started in just three simple steps and transform how you consume video content.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connection lines */}
          <div className="hidden md:block absolute top-24 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-0.5 bg-gradient-to-r from-red-300 via-violet-300 to-blue-300 dark:from-red-800 dark:via-violet-800 dark:to-blue-800"></div>

          {steps.map((step, index) => (
            <motion.div key={index} className="flex flex-col items-center relative" variants={itemVariants}>
              <motion.div
                className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg relative z-10`}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)",
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-white/20 blur-sm"
                />
                {step.icon}
              </motion.div>

              <motion.div
                className="text-center"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

