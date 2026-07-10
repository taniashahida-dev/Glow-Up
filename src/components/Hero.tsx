import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gray-100 overflow-hidden pt-20">
      {/* Background Image with Figma's exact Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920')" }} // আপনি চাইলে আপনার লোকাল ইমেজ পাথ দিতে পারেন
      >
        {/* Luxury Linear Overlay: Dark-to-transparent from Left to Right */}
        <div className="absolute inset-0 bg-linear-to-r from-salon-dark/90 via-salon-dark/40 to-transparent" />
        {/* Soft Pink glow from top-left */}
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-salon-pink/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium tracking-wide mb-6 border border-white/10">
            <span className="text-amber-400">✦</span> New York’s Premier Beauty Destination
          </div>

          {/* Headings with Gradient */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white mb-4">
            Book Your Perfect <br />
            <span className="text-glow-gradient">Salon Experience</span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed font-light">
            Discover expert hair, skin, and beauty services tailored just for you. 
            Over 1,200 satisfied clients trust GlowUp for their transformation journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link href="/services" className="btn-pink text-base px-8 py-3.5 flex items-center gap-2">
              Book Now <span>→</span>
            </Link>
            <Link href="/services" className="btn-outline-white text-base px-8 py-3.5">
              Explore Services
            </Link>
          </div>

          {/* Statistics Grid (Figma Counter Design) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/5">
            <div className="text-center sm:text-left border-r border-white/10 last:border-0 pr-2">
              <div className="text-2xl font-bold">1,200+</div>
              <div className="text-xs text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center sm:text-left border-r border-white/10 last:border-0 pr-2">
              <div className="text-2xl font-bold">42</div>
              <div className="text-xs text-gray-400">Services</div>
            </div>
            <div className="text-center sm:text-left border-r border-white/10 last:border-0 pr-2">
              <div className="text-2xl font-bold">15</div>
              <div className="text-xs text-gray-400">Expert Artists</div>
            </div>
            <div className="text-center sm:text-left last:border-0">
              <div className="text-2xl font-bold">5.0★</div>
              <div className="text-xs text-gray-400">Avg Rating</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}