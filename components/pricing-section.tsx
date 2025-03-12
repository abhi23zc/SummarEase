"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50])

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for trying out the platform",
      features: ["5 video summaries per month", "Basic Q&A functionality", "720p video quality", "Email support"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: { monthly: 12, annual: 9 },
      description: "Ideal for regular content consumers",
      features: [
        "50 video summaries per month",
        "Advanced Q&A with follow-ups",
        "1080p video quality",
        "Priority email support",
        "Save summaries history",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Business",
      price: { monthly: 29, annual: 24 },
      description: "For professionals and teams",
      features: [
        "Unlimited video summaries",
        "Full Q&A capabilities",
        "4K video quality",
        "24/7 priority support",
        "Team collaboration features",
        "API access",
        "Custom branding",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 relative overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.05),transparent_70%)]"></div>

      <motion.div style={{ opacity, y }} className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-4 inline-block"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-[800px] mx-auto mb-8"
          >
            Choose the plan that works best for your needs. All plans include core features.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center space-x-2 mb-8"
          >
            <Label
              htmlFor="billing-toggle"
              className={`text-sm ${!isAnnual ? "text-gray-900 dark:text-white font-medium" : "text-gray-500"}`}
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-violet-600 data-[state=checked]:to-indigo-600"
            />
            <Label
              htmlFor="billing-toggle"
              className={`text-sm ${isAnnual ? "text-gray-900 dark:text-white font-medium" : "text-gray-500"}`}
            >
              Annual <span className="text-green-500 font-medium">Save 20%</span>
            </Label>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
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
                className="h-full"
              >
                <Card
                  className={`h-full border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-lg relative overflow-hidden ${
                    plan.popular ? "ring-2 ring-violet-500 dark:ring-violet-400" : ""
                  }`}
                >
                  {plan.popular && (
                    <>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                          Most Popular
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-indigo-500/5 dark:from-violet-500/10 dark:to-indigo-500/10"></div>
                    </>
                  )}

                  <CardHeader className="pt-8 pb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        {plan.price.monthly > 0 ? `/month` : ""}
                      </span>
                      {isAnnual && plan.price.monthly > 0 && (
                        <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Billed annually (${plan.price.annual * 12}/year)
                        </span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + index * 0.2 }}
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

