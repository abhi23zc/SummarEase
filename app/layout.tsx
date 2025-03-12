import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals2.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SummarEase AI - YouTube Video Summarization & Q&A",
  description:
    "Save hours of time with AI-powered video summaries and interactive Q&A. Get the key insights without watching the entire video.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

