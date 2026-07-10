"use client";

import { motion } from "framer-motion";
import { Search, UserCheck, CalendarDays, Sparkles } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Choose a Service",
    description:
      "Browse our curated menu of premium beauty treatments and find your perfect match.",
    icon: Search,
  },
  {
    id: "02",
    title: "Select Your Stylist",
    description:
      "Choose from our team of certified specialists based on expertise and availability.",
    icon: UserCheck,
  },
  {
    id: "03",
    title: "Pick Your Time",
    description:
      "Select a date and time that fits your schedule with our real-time availability calendar.",
    icon: CalendarDays,
  },
  {
    id: "04",
    title: "Confirm & Glow",
    description:
      "Receive instant confirmation and prepare for a transformative beauty experience.",
    icon: Sparkles,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 16,
    },
  },
  hoverState: {
    y: -10,
    boxShadow: "0 30px 50px -10px rgba(236, 72, 153, 0.12)",
    backgroundColor: "#ffffff",
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export default function BookingProcess() {
  return (
    <section className="py-24 bg-[#fff7f7] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-75 bg-linear-to-r from-pink-200/20 to-purple-200/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 bg-pink-100 text-salon-pink text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-xs">
            ✦ Simple Process
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-salon-dark mb-4 tracking-tight">
            Booking Made{" "}
            <span className="italic font-serif font-normal text-salon-pink">
              Effortless
            </span>
          </h2>
          <p className="text-salon-muted text-sm md:text-base max-w-md mx-auto font-light">
            From selection to salon chair in under two minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-px border-t border-dashed border-pink-200 -translate-y-16 z-0" />

          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={cardVariants}
                whileHover="hoverState"
                className="bg-white/80 backdrop-blur-md p-8 rounded-3xl flex flex-col items-start h-full cursor-pointer shadow-[0_15px_35px_-5px_rgba(236,72,153,0.03)] transition-all duration-500 relative z-10 select-none"
              >
                {/* Icon & Step Number */}
                <div className="w-full flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100/80 text-purple-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                    <IconComponent size={20} strokeWidth={2.2} />
                  </div>

                  <span className="text-3xl font-serif font-black text-pink-100 tracking-tighter">
                    {step.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-salon-dark mb-3 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-salon-muted/90 text-[13px] leading-relaxed font-normal">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
