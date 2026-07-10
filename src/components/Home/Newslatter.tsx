"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
    }
  };

  return (
    <section className="py-24 bg-[#fff7f7] relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="bg-glow-gradient rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-[0_20px_50px_rgba(236,72,153,0.15)]"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10"
            >
              <Sparkles size={22} className="text-pink-100" />
            </motion.div>

            {/* Typography */}
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Get Exclusive Beauty Tips
            </h2>
            <p className="text-pink-100/90 text-sm md:text-base font-light mb-10 max-w-md">
              Join 12,000+ beauty enthusiasts receiving weekly tips, offers, and
              GlowUp news.
            </p>

            <div className="w-full max-w-md min-h-14 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col sm:flex-row gap-3 items-center"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-3.5 bg-white/15 border border-white/20 rounded-xl text-sm text-white placeholder-white/50 focus:outline-hidden focus:ring-2 focus:ring-white/40 backdrop-blur-xs transition-all font-light"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-white text-salon-pink font-bold text-sm rounded-xl hover:bg-pink-50 shadow-lg shadow-black/5 active:scale-98 transition-all cursor-pointer whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 12 }}
                    className="w-full py-3.5 px-6 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center gap-2.5 text-white backdrop-blur-md"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-pink-200 animate-pulse"
                    />
                    <span className="text-sm font-semibold tracking-wide">
                      You`re subscribed — welcome to the family!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
