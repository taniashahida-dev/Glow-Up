import { Sparkles } from "lucide-react";
import ContactClient from "./ContactClient";


export const metadata = {
  title: "Contact Us | GlowUp Salon",
  description: "Questions, feedback, or partnership inquiries — our team is ready to help.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#fff7f7] min-h-screen py-24 relative overflow-hidden">
      {/* Background Soft Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-120 h-120 bg-pink-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-150 h-150 bg-purple-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 bg-pink-100 text-salon-pink text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-xs">
            <Sparkles size={12} className="fill-salon-pink/20" /> Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-salon-dark mb-4 tracking-tight">
            We`d Love to <span className="italic font-serif font-normal text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-500">Hear from You</span>
          </h1>
          <p className="text-salon-muted text-sm md:text-base font-light max-w-lg mx-auto">
            Questions, feedback, or partnership inquiries — our team is ready to help.
          </p>
        </div>

        {/* Contact Client Component Rendering */}
        <ContactClient />

      </div>
    </main>
  );
}