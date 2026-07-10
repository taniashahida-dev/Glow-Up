"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";

const infoCards = [
  {
    id: 1,
    title: "Visit Us",
    content: "123 Luxury Lane, Beverly Hills, CA 90210",
    subContent: "",
    icon: MapPin,
    iconBg: "bg-pink-100/80 text-salon-pink",
  },
  {
    id: 2,
    title: "Call Us",
    content: "+1 (800) GLOW-UP",
    subContent: "Mon–Sat, 9 AM – 7 PM",
    icon: Phone,
    iconBg: "bg-purple-100/80 text-purple-500",
  },
  {
    id: 3,
    title: "Email Us",
    content: "hello@glowup.com",
    subContent: "Response within 24 hours",
    icon: Mail,
    iconBg: "bg-rose-100/80 text-rose-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
} as const;

export default function ContactClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.message) {
      setIsSent(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Info Cards & Beautiful Studio Photo */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="lg:col-span-5 flex flex-col gap-6"
      >
        {infoCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-2xl border border-slate-100/60 shadow-[0_10px_30px_-10px_rgba(236,72,153,0.02)] flex items-center gap-5 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${card.iconBg}`}>
                <IconComponent size={20} strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {card.title}
                </h4>
                <p className="text-sm font-extrabold text-salon-dark mb-0.5">
                  {card.content}
                </p>
                {card.subContent && (
                  <p className="text-[11px] text-salon-muted font-normal">
                    {card.subContent}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Studio Showcase Image */}
        <motion.div 
          variants={cardVariants}
          className="relative h-64 w-full rounded-2xl overflow-hidden shadow-[0_15px_35px_-5px_rgba(0,0,0,0.05)] border border-white group"
        >
          <img
            src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80"
            alt="GlowUp Premium Studio Interior"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* Right Column: Send a Message Form */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.2 }}
        className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-slate-100/80 shadow-[0_20px_50px_-15px_rgba(236,72,153,0.04)]"
      >
        <h2 className="text-2xl font-extrabold text-salon-dark mb-8 tracking-tight">
          Send a Message
        </h2>

        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.form 
              key="contact-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="Your name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm text-salon-dark placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-pink-500/10 focus:border-pink-500 transition-all font-light"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm text-salon-dark placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-pink-500/10 focus:border-pink-500 transition-all font-light"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm text-salon-dark placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-pink-500/10 focus:border-pink-500 transition-all font-light"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us more..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm text-salon-dark placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-pink-500/10 focus:border-pink-500 transition-all font-light resize-none"
                />
              </div>

              <div className="pt-2">
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md shadow-pink-500/10 hover:shadow-lg hover:shadow-pink-500/20 active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Send Message
                  <Send size={15} />
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="py-12 text-center flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-pink-100 text-salon-pink flex items-center justify-center mb-2 shadow-inner">
                <CheckCircle2 size={32} className="animate-bounce" />
              </div>
              <h3 className="text-xl font-extrabold text-salon-dark">
                Message Sent Successfully!
              </h3>
              <p className="text-salon-muted text-sm font-light max-w-sm leading-relaxed mb-6">
                Thank you, <span className="font-bold text-slate-700">{formData.fullName}</span>. We have received your query and our team will reach back within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setFormData({ fullName: "", email: "", subject: "", message: "" });
                }}
                className="text-xs font-bold text-salon-pink hover:text-salon-pink-hover transition-colors underline underline-offset-4 cursor-pointer"
              >
                Send another message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}