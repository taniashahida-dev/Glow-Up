"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {   MapPin, Phone, Mail, Sparkles } from "lucide-react";
import { FiFacebook ,FiTwitter,FiInstagram} from "react-icons/fi";

const footerLinks = {
  services: [
    { name: "Hair Treatment", href: "/services" },
    { name: "Skin & Facials", href: "/services" },
    { name: "Body Massage", href: "/services" },
    { name: "Nail Art", href: "/services" },
    { name: "Microblading", href: "/services" },
    { name: "Balayage", href: "/services" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Contact", href: "/contact" },
    { name: "Services", href: "/services" },
  ],
};

const socialIcons = [
  { icon: FiInstagram, href: "https://instagram.com" },
  { icon: FiTwitter, href: "https://twitter.com" },
  { icon: FiFacebook, href: "https://facebook.com" },
];

export default function Footer() {
  return (
    // Figma Exact Deep Purple-Dark Mix Background
    <footer className="bg-[#12072b] text-gray-400 pt-20 pb-8 relative overflow-hidden border-t border-purple-950/40">
      
      {/* Background Soft Ambient Light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
          
          {/* Column 1: Brand & Bio (Spans 4 columns on desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-pink-500 to-purple-600 flex items-center justify-center">
                <Sparkles size={16} className="text-white fill-white/20" />
              </div>
              <span className="text-xl font-extrabold tracking-tight font-sans">
                GlowUp
              </span>
            </Link>
            <p className="text-sm font-light leading-relaxed max-w-xs text-purple-200/60">
              Where luxury meets beauty. Your transformation starts here.
            </p>
            {/* Social Icons Container */}
            <div className="flex items-center gap-3 pt-2">
              {socialIcons.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, backgroundColor: "rgba(236, 72, 153, 0.2)", color: "#ffffff" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors text-purple-200/80 cursor-pointer"
                  >
                    <IconComponent size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Services Link List (Spans 3 columns on desktop) */}
          <div className="lg:col-span-3 lg:pl-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">
              Services
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm font-light">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <Link href={link.href} className="hover:text-pink-400 transition-colors text-purple-200/60">
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Link List (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">
              Company
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm font-light">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <Link href={link.href} className="hover:text-pink-400 transition-colors text-purple-200/60">
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (Spans 3 columns on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-1">
              Contact
            </h3>
            <div className="flex flex-col gap-4 text-sm font-light text-purple-200/60">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-pink-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">123 Luxury Lane, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-pink-500 shrink-0" />
                <span>+1 (800) GLOW-UP</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-pink-500 shrink-0" />
                <a href="mailto:hello@glowup.com" className="hover:text-pink-400 transition-colors">
                  hello@glowup.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-purple-300/40">
          <p>© 2026 GlowUp. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}