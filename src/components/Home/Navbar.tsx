"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChessQueen, Menu, X } from "lucide-react"; // Menu এবং X আইকন যোগ করা হয়েছে
import { getUserSession } from "@/lib/core/session";
import { useSession } from "@/lib/auth-client";



export default function Navbar() {
 const { data } = useSession();
  const user = data?.user;
  console.log(user)
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনু ওপেন/ক্লোজ স্টেট
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-white text-salon-dark shadow-sm py-4"
          : "bg-transparent py-6 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="w-8 h-8 rounded-full bg-glow-gradient flex items-center justify-center text-white text-xs">
            <ChessQueen size={18} />
          </span>
          <span className={isScrolled || isOpen ? "text-salon-dark" : "text-white"}>Glow</span>
          <span className="text-salon-pink">Up</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link 
            href="/" 
            className={`transition-colors ${isActive("/") ? "text-salon-pink font-semibold" : "hover:text-salon-pink"}`}
          >
            Home
          </Link>
          <Link 
            href="/services" 
            className={`transition-colors ${isActive("/services") ? "text-salon-pink font-semibold" : "hover:text-salon-pink"}`}
          >
            Services
          </Link>
          <Link 
            href="/about" 
            className={`transition-colors ${isActive("/about") ? "text-salon-pink font-semibold" : "hover:text-salon-pink"}`}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`transition-colors ${isActive("/contact") ? "text-salon-pink font-semibold" : "hover:text-salon-pink"}`}
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth / Profile Area */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className={isScrolled ? "text-salon-muted" : "text-gray-300"}>
                Hello, <span className={`font-semibold ${isScrolled ? "text-salon-dark" : "text-white"}`}>{user.name}</span>
              </span>
              <Link
                href="/dashboard"
                className={`transition-colors ${isActive("/dashboard") ? "text-salon-pink font-semibold" : "hover:text-salon-pink"}`}
              >
                Dashboard
              </Link>
              <button
                
                className="hover:text-red-500 font-medium transition-colors cursor-pointer text-salon-muted"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link 
                href="/login" 
                className={`text-sm font-medium transition-colors hover:text-salon-pink ${isScrolled ? "text-salon-dark" : "text-white"}`}
              >
                Login
              </Link>
              <Link href="/signup" className="btn-pink py-2! px-4!">
               signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden block focus:outline-none cursor-pointer"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white w-full border-t border-gray-100 absolute left-0 top-full py-6 px-6 flex flex-col gap-4 shadow-lg text-salon-dark animate-in fade-in slide-in-from-top-5 duration-200">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`text-base font-medium ${isActive("/") ? "text-salon-pink" : ""}`}
          >
            Home
          </Link>
          <Link 
            href="/services" 
            onClick={() => setIsOpen(false)}
            className={`text-base font-medium ${isActive("/services") ? "text-salon-pink" : ""}`}
          >
            Services
          </Link>
          <Link 
            href="/about" 
            onClick={() => setIsOpen(false)}
            className={`text-base font-medium ${isActive("/about") ? "text-salon-pink" : ""}`}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setIsOpen(false)}
            className={`text-base font-medium ${isActive("/contact") ? "text-salon-pink" : ""}`}
          >
            Contact
          </Link>
          
          <hr className="border-gray-100 my-2" />

          {user ? (
            <div className="flex flex-col gap-4">
              <span className="text-sm text-salon-muted">
                Hello, <span className="font-semibold text-salon-dark">{user.name}</span>
              </span>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium ${isActive("/dashboard") ? "text-salon-pink" : ""}`}
              >
                Dashboard
              </Link>
              <button
                onClick={() => { setIsOpen(false); }}
                className="text-left text-base font-medium text-red-500 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="text-base font-medium hover:text-salon-pink"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                onClick={() => setIsOpen(false)}
                className="btn-pink text-center w-full py-2.5!"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}