"use client";

import { motion } from "framer-motion";
import { Award, Heart, ShieldCheck, CalendarCheck } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Professional Staff",
    description:
      "Our team holds international certifications and trains with top industry masters twice a year.",
    icon: Award,
    iconBg: "bg-pink-100/80 text-salon-pink",
  },
  {
    id: 2,
    title: "Affordable Pricing",
    description:
      "Luxury salon experience without the luxury price tag. Transparent pricing with zero hidden fees.",
    icon: Heart,
    iconBg: "bg-purple-100/80 text-purple-500",
  },
  {
    id: 3,
    title: "Premium Products",
    description:
      "We use only professional-grade products from Schwarzkopf, Wella, MAC, Charlotte Tilbury, and La Mer.",
    icon: ShieldCheck,
    iconBg: "bg-amber-100/80 text-amber-500",
  },
  {
    id: 4,
    title: "Easy Online Booking",
    description:
      "Book your appointment in under 2 minutes, available 24/7. Instant email and SMS confirmation.",
    icon: CalendarCheck,
    iconBg: "bg-rose-100/80 text-rose-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 16 },
  },
} as const;

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-pink-50 text-salon-pink text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-pink-100">
            Why GlowUp
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-salon-dark mb-4">
            The GlowUp Difference
          </h2>
          <p className="text-salon-muted text-base md:text-lg leading-relaxed font-light">
            We combine artistry, expertise, and premium products to deliver
            results that speak for themselves.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow:
                    "0 25px 30px -10px rgba(236, 72, 153, 0.15), 0 10px 15px -5px rgba(236, 72, 153, 0.1)",
                }}
                className="p-8 flex flex-col items-start h-full cursor-pointer rounded-2xl bg-linear-to-b from-white to-pink-50/30 border border-pink-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pink-100/20 rounded-full blur-xl pointer-events-none" />

                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-white/50 ${feature.iconBg}`}
                >
                  <IconComponent size={22} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-salon-dark mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-salon-muted text-sm leading-relaxed font-normal">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}