"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const stylists = [
  {
    id: 1,
    name: "Sophia Laurent",
    role: "Master Hair Colorist",
    rating: 4.9,
    clients: "1,240",
    bio: "15 years transforming hair with award-winning balayage and color techniques.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Isabelle Chen",
    role: "Skincare & Facial Specialist",
    rating: 5.0,
    clients: "987",
    bio: "Certified esthetician passionate about helping clients achieve their glow goals.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Margot Rivera",
    role: "Brow & Lash Artist",
    rating: 4.8,
    clients: "743",
    bio: "Precision brow architect with a signature approach to facial framing.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};


const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 14 },
  },
} as const; 

export default function FeaturedStylists() {
  return (
    <section className="py-24 bg-[#fff7f7] relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-125 h-125 bg-pink-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-salon-dark mb-4 tracking-tight">
            Meet Your{" "}
            <span className="italic font-serif font-normal text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-600">
              Stylists
            </span>
          </h2>
          <p className="text-salon-muted text-sm md:text-base font-light max-w-lg mx-auto">
            Passionate specialists with decades of combined experience, ready to
            bring your vision to life.
          </p>
        </div>

        {/* Stylists Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stylists.map((stylist) => (
            <motion.div
              key={stylist.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden flex flex-col h-full shadow-[0_15px_35px_-5px_rgba(236,72,153,0.03)] border border-slate-100/60 group transition-all duration-300"
            >
              {/* Image & Overlay Info Box */}
              <div className="relative h-80 w-full overflow-hidden bg-slate-100">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                  <h3 className="text-xl text-white font-bold tracking-tight mb-1">
                    {stylist.name}
                  </h3>
                  <p className="text-pink-300 text-xs font-medium mb-3">
                    {stylist.role}
                  </p>

                  {/* Rating & Client Info */}
                  <div className="flex items-center justify-between text-xs text-gray-300 border-t border-white/10 pt-3">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={
                              i < Math.floor(stylist.rating)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        ))}
                      </div>
                      <span className="font-bold text-white ml-1">
                        {stylist.rating}
                      </span>
                    </div>
                    <span>{stylist.clients} clients</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col grow justify-between bg-white">
                <p className="text-salon-muted text-sm leading-relaxed mb-6 font-light">
                  {stylist.bio}
                </p>

                <a href="/services" className="w-full block">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md shadow-pink-500/10 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 flex items-center justify-center gap-1 group-hover:opacity-100"
                  >
                    Book with {stylist.name.split(" ")[0]}
                  </motion.button>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}