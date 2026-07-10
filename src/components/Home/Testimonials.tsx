"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Amelia Foster",
    location: "New York, NY",
    service: "Balayage Coloring",
    avatarInitials: "AF",
    avatarBg: "bg-purple-500",
    text: "“GlowUp completely changed my relationship with self-care. Sophia transformed my hair beyond what I thought was possible. I leave every appointment feeling like a new person.”",
  },
  {
    id: 2,
    name: "Priya Nair",
    location: "Los Angeles, CA",
    service: "Facial Glow Therapy",
    avatarInitials: "PN",
    avatarBg: "bg-pink-500",
    text: "“The Facial Glow Therapy is my monthly ritual now. My skin has never looked better and the whole experience is pure luxury. The team truly listens to your skin goals.”",
  },
  {
    id: 3,
    name: "Camille Dubois",
    location: "Chicago, IL",
    service: "Signature Spa Massage",
    avatarInitials: "CD",
    avatarBg: "bg-fuchsia-500",
    text: "“Booked the Signature Spa Massage for my birthday and it was absolutely transcendent. The attention to detail, the ambience, the care — GlowUp is in a league of its own.”",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 65, damping: 15 },
  },
} as const;

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#fff7f7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 bg-pink-100 text-salon-pink text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            ✦ Client Love
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-salon-dark mb-4 tracking-tight">
            What Our Clients{" "}
            <span className="italic font-serif font-normal text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-500">
              Say
            </span>
          </h2>
          <p className="text-salon-muted text-sm md:text-base font-light max-w-md mx-auto">
            Thousands of clients trust GlowUp for their most important beauty
            moments.
          </p>
        </div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 30px 60px -15px rgba(236, 72, 153, 0.1)",
              }}
              className="bg-white p-8 rounded-3xl flex flex-col justify-between h-full cursor-pointer shadow-[0_15px_35px_-5px_rgba(236,72,153,0.03)] transition-all duration-500"
            >
              <div>
                {/* 5 Stars Indicator */}
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" stroke="none" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-[15px] leading-relaxed font-normal mb-8 italic">
                  {review.text}
                </p>
              </div>

              {/* Client Info / Avatar block */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                {/* Avatar with Initials */}
                <div
                  className={`w-11 h-11 rounded-full ${review.avatarBg} text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-inner`}
                >
                  {review.avatarInitials}
                </div>

                {/* Name & Details */}
                <div>
                  <h4 className="text-sm font-extrabold text-salon-dark mb-0.5">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-salon-muted font-medium">
                    {review.location}{" "}
                    <span className="text-pink-200 mx-1">•</span>{" "}
                    <span className="text-salon-pink/80">{review.service}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}