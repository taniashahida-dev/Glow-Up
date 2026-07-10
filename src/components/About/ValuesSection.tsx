"use client";

import { motion } from "framer-motion";
import { Crown, Heart, Zap } from "lucide-react";

const values = [
  {
    id: 1,
    title: "Excellence in Craft",
    description: "We never settle. Every treatment, every technique, every product is held to the highest standard of quality and safety.",
    icon: Crown,
    iconBg: "bg-pink-50 text-pink-500",
  },
  {
    id: 2,
    title: "Client First, Always",
    description: "Your comfort, confidence, and satisfaction are at the center of every decision we make — from booking to the final reveal.",
    icon: Heart,
    iconBg: "bg-purple-50 text-purple-500",
  },
  {
    id: 3,
    title: "Continuous Innovation",
    description: "We stay at the forefront of beauty science, constantly training and adopting the latest techniques and technologies.",
    icon: Zap,
    iconBg: "bg-amber-50 text-amber-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};


const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 15 },
  },
  hoverState: {
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.08)",
    backgroundColor: "#ffffff",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
} as const; 

export default function ValuesSection() {
  return (
    <section className="py-24 bg-[#fff7f7] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 bg-pink-100 text-salon-pink text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            ✦ Our Values
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-salon-dark tracking-tight leading-tight">
            What Drives Us
          </h2>
        </div>

        {/* Values Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {values.map((value) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={value.id}
                variants={fadeUpVariants}
                whileHover="hoverState"
                className="bg-white/80 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center text-center cursor-pointer shadow-[0_15px_35px_-5px_rgba(236,72,153,0.02)] transition-all duration-500 select-none border border-slate-100/50"
              >
                {/* Elegant Rounded Icon Container */}
                <div className={`w-12 h-12 ${value.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                  <IconComponent size={22} className="stroke-[2.2]" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-salon-dark mb-4">
                  {value.title}
                </h3>
                
                {/* Description */}
                <p className="text-salon-muted text-[13.5px] leading-relaxed font-light">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}