"use client";
import {
  ArrowRight,
  CheckCircle,
  Play,
  MessageSquare,
  Clock,
  Search,
} from "lucide-react";
import Link from "next/link";
import VideoSummarizer from "@/components/video-summarizer";
import FeatureCard from "@/components/feature-card";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";
import PricingSection from "@/components/pricing-section";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import GradientBackground from "@/components/gradient-background";

export default function Home() {
  

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      <GradientBackground />

      <Header />

      <main className="relative">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex flex-col space-y-4 lg:space-y-6 lg:w-1/2">
                <div className="inline-flex items-center rounded-full border border-violet-200 dark:border-violet-800 bg-white/10 dark:bg-black/10 backdrop-blur-sm px-3 py-1 text-sm font-medium text-violet-700 dark:text-violet-300 mb-2">
                  <span className="flex h-2 w-2 rounded-full bg-violet-500 mr-2"></span>
                  Introducing SummarEase AI
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white">
                  Summarize YouTube Videos in{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-400 dark:from-violet-400 dark:to-indigo-300">
                    Seconds
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-[600px]">
                  Save hours of time with AI-powered video summaries and
                  interactive Q&A. Get the key insights without watching the
                  entire video.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href={"/home"}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
                    >
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-violet-200 dark:border-violet-800 backdrop-blur-sm bg-white/10 dark:bg-black/10"
                  >
                    <Play className="mr-2 h-4 w-4" /> Watch Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 pt-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                    No credit card required
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                    Cancel anytime
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <VideoSummarizer />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent)]"></div>

          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-4 inline-block">
                Why Choose SummarEase AI?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-[800px] mx-auto">
                Our platform offers powerful features designed to save you time
                and enhance your learning experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={
                  <Clock className="h-10 w-10 text-violet-600 dark:text-violet-400" />
                }
                title="Save Hours of Time"
                description="Get concise summaries of long videos in seconds, extracting only the key information you need."
              />
              <FeatureCard
                icon={
                  <MessageSquare className="h-10 w-10 text-violet-600 dark:text-violet-400" />
                }
                title="Interactive Q&A"
                description="Ask specific questions about the video content and get instant, accurate answers."
              />
              <FeatureCard
                icon={
                  <Search className="h-10 w-10 text-violet-600 dark:text-violet-400" />
                }
                title="Deep Content Analysis"
                description="Our AI analyzes speech, text, and visual elements to provide comprehensive summaries."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Testimonials */}
        <Testimonials />

        {/* Pricing Section */}
        <PricingSection />

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-900 dark:to-indigo-900"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-5"></div>

          {/* Animated gradient orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Save Time on YouTube Videos?
            </h2>
            <p className="text-lg text-violet-100 max-w-[600px] mx-auto mb-8">
              Join thousands of users who are already getting more value from
              their video content with SummarEase AI.
            </p>
            <Button
              size="lg"
              className="bg-white text-violet-600 hover:bg-gray-100 dark:bg-white/90 dark:hover:bg-white"
            >
              Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-50 dark:bg-gray-900 relative z-10">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Product
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      API
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Integrations
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Connect
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Discord
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      Email
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
              <p>
                © {new Date().getFullYear()} SummarEase AI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
