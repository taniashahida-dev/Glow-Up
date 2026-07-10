import Image from "next/image";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import ValuesSection from "@/components/About/ValuesSection";
import TeamSection from "@/components/About/TeamSection";

export const metadata = {
  title: "About Us | GlowUp Salon",
  description: "Learn about GlowUp's journey, our mission, and our vision to redefine premium beauty services.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#fff7f7] min-h-screen text-salon-dark font-sans overflow-hidden">
      
      {/* 1. Hero Section (Our Story Banner) */}
      <section className="relative h-112.5 md:h-137.5 flex items-center justify-center overflow-hidden">
        {/* Figma Hero Image Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1920&q=80"
            alt="GlowUp Luxury Salon Interior"
            fill
            priority
            className="object-cover object-center brightness-45"
          />
        </div>

        {/* Content Box */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-xs">
            Our Story
          </h1>
          <p className="text-white/90 text-base md:text-xl max-w-xl mx-auto font-light tracking-wide">
            Founded with passion, built on excellence.
          </p>
        </div>
      </section>

      {/* 2. Our Beginning Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Content */}
          <div className="space-y-6">
            <span className="inline-flex items-center bg-pink-100 text-salon-pink text-xs font-bold px-4 py-1.5 rounded-full shadow-xs">
              ✦ Our Beginning
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-salon-dark tracking-tight leading-tight">
              From a Small Studio to <br />
              New York`s <span className="italic font-serif font-normal text-salon-pink">Premier Salon</span>
            </h2>
            
            <div className="space-y-4 text-salon-muted text-sm md:text-base font-light leading-relaxed">
              <p>
                GlowUp was born in 2018 from founder Sarah Mitchell`s vision of a salon that combined expert artistry with a genuinely warm, welcoming environment. Starting with just 3 stylists in a 500 sq ft Chelsea studio, Sarah&apos;s commitment to personalized service quickly earned GlowUp a loyal following.
              </p>
              <p>
                Today, our team of 15 certified beauty professionals serves over 1,200 clients monthly across our expanded flagship location in the heart of New York&apos;s Beauty District. Every service is crafted with the same love and attention that started it all.
              </p>
            </div>

            <div className="pt-4">
              <button className="btn-pink group inline-flex items-center gap-2 px-7 py-3.5 shadow-md shadow-pink-500/10 hover:shadow-lg hover:shadow-pink-500/20 active:scale-98">
                Get In Touch
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Image with Since 2018 Floating Card Overlay (Figma Exact Match - image_25dda0.jpg) */}
          <div className="relative h-100 md:h-125 w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] group">
            <Image
              src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=80"
              alt="GlowUp Luxury Salon Studio"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />

            {/* Since 2018 Floating Card */}
            <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-xs p-5 md:p-6 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-pink-50 max-w-55 md:max-w-65 transition-transform duration-500 hover:-translate-y-1">
              <h4 className="text-xl md:text-2xl font-extrabold text-[#a855f7] leading-none mb-1.5">
                Since 2018
              </h4>
              <p className="text-slate-500 text-xs md:text-sm font-normal leading-tight">
                Crafting beauty experiences
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. What Drives Us (Values Section - Imported Interactive Client Component) */}
      <ValuesSection />

      {/* 4. Mission & Vision Section */}
      <section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Our Mission - Glowing Gradient Card */}
          <div className="bg-glow-gradient p-12 md:p-16 rounded-3xl text-white shadow-xl shadow-pink-500/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-pink-500/20">
            <div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <Heart size={22} className="fill-white/20" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">
                Our Mission
              </h3>
              <p className="text-white/90 text-[15px] leading-relaxed font-light tracking-wide max-w-md">
                To empower every client to feel confident and beautiful through expert beauty services, premium products, and an experience that feels like visiting a trusted friend — not just a salon. We believe beauty care should uplift your spirit.
              </p>
            </div>
          </div>

          {/* Our Vision - Clean White/Glow Ambient Card */}
          <div className="bg-white/80 backdrop-blur-md p-12 md:p-16 rounded-3xl border border-white/40 shadow-[0_15px_35px_-5px_rgba(236,72,153,0.02)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(236,72,153,0.08)] hover:bg-white">
            <div>
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-8 shadow-xs border border-amber-100">
                <Sparkles size={22} />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-salon-dark mb-4 tracking-tight">
                Our Vision
              </h3>
              <p className="text-salon-muted text-[15px] leading-relaxed font-light max-w-md">
                To become the most trusted beauty destination in New York where innovation meets tradition. We envision a world where great beauty care is accessible to everyone, and where every client leaves feeling elevated — inside and out.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Meet Our Team Section (Leadership - Imported Interactive Client Component) */}
      <TeamSection />

    </main>
  );
}