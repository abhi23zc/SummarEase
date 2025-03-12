"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function GradientBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Main background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black transition-colors duration-300"></div>

      {/* Interactive gradient that follows mouse */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-violet-300/20 to-indigo-300/20 dark:from-violet-900/10 dark:to-indigo-900/10 blur-3xl"
        animate={{
          x: mousePosition.x - 500,
          y: mousePosition.y - 500,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 50,
          mass: 2,
        }}
      />

      {/* Fixed position gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-300/10 dark:bg-violet-900/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-300/10 dark:bg-indigo-900/5 rounded-full blur-3xl"></div>

      {/* Animated gradients */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-300/10 dark:bg-blue-900/5 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 20,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-300/10 dark:bg-violet-900/5 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 25,
          ease: "easeInOut",
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  )
}

