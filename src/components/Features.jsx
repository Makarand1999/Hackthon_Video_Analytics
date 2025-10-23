import React from "react";
import { motion } from "motion/react";
import { Upload, Search, Sparkles, MessageSquare, CheckCircle, ArrowRight } from "lucide-react";
import { Card } from "../Utils/Cards";
const Features = () => {
    const features = [
  {
    icon: Upload,
    title: "Upload Your Product",
    description:
      "Whether it's food, tech, fashion, or anything in between, just drop in your product images or details.",
    delay: 0,
  },
  {
    icon: Search,
    title: "Smart Search Engine Kicks In",
    description:
      "AdBuddy automatically analyzes your product and searches for relevant themes, styles, and market data to inspire your ad.",
    delay: 0.1,
  },
  {
    icon: Sparkles,
    title: "AI-Generated Ad Mockups",
    description:
      "Within moments, you'll receive a ready-to-review video ad tailored to your product's niche and vibe.",
    delay: 0.2,
  },
  {
    icon: MessageSquare,
    title: "Edit with Prompts, Not Software",
    description:
      "Want a different tone, background, voiceover, or style? Just tell AdBuddy what you want — no editing skills needed.",
    delay: 0.3,
  },
  {
    icon: CheckCircle,
    title: "Refine Until Perfect",
    description:
      "Keep tweaking with natural language prompts until your ad looks and feels just right.",
    delay: 0.4,
  },
];
   return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="mb-4 text-3xl font-bold text-gray-900">How It Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Five simple steps from product to polished video ad
        </p>
      </motion.div>

      {/* Steps */}
      <div className="max-w-3xl mx-auto space-y-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: feature.delay }}
          >
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-white">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="p-4 rounded-xl bg-blue text-white">
                    <feature.icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      Step {index + 1}
                    </span>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                {index < features.length - 1 && (
                  <div className="flex-shrink-0">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Campaign Creation Section */}
      <div className="mt-32">
        {/* <CampaignCreation onCreateCampaign={onCreateCampaign} /> */}
      </div>
    </div>
  );
}

export default Features

