"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    id: 1,
    name: "Sophia Laurent",
    role: "Master Hair Colorist",
    bio: "15 years transforming hair with award-winning balayage and color techniques.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Isabelle Chen",
    role: "Skincare & Facial Specialist",
    bio: "Certified esthetician passionate about helping clients achieve their glow goals.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Margot Rivera",
    role: "Brow & Lash Artist",
    bio: "Precision brow architect with a signature approach to facial framing.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const teamMemberVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 14 },
  },
} as const; 

export default function TeamSection() {
  return (
    <section className="py-24 bg-[#fff7f7] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 bg-pink-100 text-salon-pink text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            ✦ Leadership
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-salon-dark tracking-tight leading-tight">
            Meet Our Team
          </h2>
        </div>

        {/* Team Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {team.map((member) => (
            <motion.div 
              key={member.id}
              variants={teamMemberVariants}
             
              className="flex flex-col items-center text-center group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5"
            >
              {/* Round Pink Border (Double Ring Frame from Figma) */}
              <div className="relative w-48 h-48 rounded-full p-1.5 border-2 border-pink-200 group-hover:border-pink-400 transition-colors duration-500 mb-6 bg-white shadow-xs">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-w-7xl) 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Info */}
              <h3 className="text-2xl font-bold text-salon-dark mb-1 font-serif">
                {member.name}
              </h3>
              <p className="text-salon-pink text-sm font-semibold mb-4">
                {member.role}
              </p>
              <p className="text-salon-muted text-[13px] leading-relaxed font-light max-w-xs">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}