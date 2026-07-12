"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, Menu, X, ChevronDown, LayoutDashboard, CalendarDays, ClipboardList, PlusCircle, Users, LogOut, Settings } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function Navbar() {
  const { data } = useSession();

  type SessionUser = NonNullable<typeof data>["user"] & { role?: "user" | "admin" };
  const user = data?.user as SessionUser | undefined;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path;
  const isWhiteNavbar = isScrolled || isOpen || pathname === "/services" || pathname === "/contact";

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setIsOpen(false);
    console.log("Logging out...");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isWhiteNavbar
          ? "bg-white text-salon-dark shadow-xs py-4"
          : "bg-transparent py-6 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="w-8 h-8 rounded-full bg-glow-gradient flex items-center justify-center text-white text-xs">
            <Crown size={18} />
          </span>
          <span className={isWhiteNavbar ? "text-salon-dark" : "text-white"}>Glow</span>
          <span className="text-salon-pink">Up</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          {["/", "/services", "/about", "/contact"].map((path) => (
            <Link 
              key={path}
              href={path} 
              className={`transition-colors capitalize ${
                isActive(path) 
                  ? "text-salon-pink font-semibold" 
                  : isWhiteNavbar ? "hover:text-salon-pink text-salon-dark" : "hover:text-salon-pink text-white"
              }`}
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
          
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 text-sm font-medium focus:outline-hidden cursor-pointer select-none transition-colors ${
                  isWhiteNavbar ? "text-salon-dark hover:text-salon-pink" : "text-white hover:text-gray-200"
                }`}
              >
                <span>Hello, <span className="font-semibold">{user.name}</span></span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/*Drop down */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 text-salon-dark animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-xs text-slate-400 font-medium">Logged in as</p>
                    <p className="text-xs font-bold text-salon-pink capitalize">{user.role || "User"}</p>
                  </div>

                  {/*  ADMIN MENU */}
                  {user.role === "admin" ? (
                    <>
                      <Link href="/admin/add-service" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-salon-pink transition-colors">
                        <PlusCircle size={16} /> Add Service
                      </Link>
                      <Link href="/admin/manage-services" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-salon-pink transition-colors">
                        <ClipboardList size={16} /> Manage Services
                      </Link>
                      <Link href="/admin/manage-users" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-salon-pink transition-colors">
                        <Users size={16} /> Manage Users
                      </Link>
                    </>
                  ) : (
                    /* 👤NORMAL USER MENU */
                    <>
                      <Link href="/my-bookings" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-salon-pink transition-colors">
                        <CalendarDays size={16} /> My Bookings
                      </Link>
                      <Link href="/services" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-salon-pink transition-colors">
                        <Settings size={16} /> Services
                      </Link>
                    </>
                  )}

                
                  <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-salon-pink transition-colors border-t border-slate-50 mt-1">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50/50 transition-colors text-left cursor-pointer">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link 
                href="/login" 
                className={`text-sm font-medium transition-colors hover:text-salon-pink ${isWhiteNavbar ? "text-salon-dark" : "text-white"}`}
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
          className={`md:hidden block focus:outline-hidden cursor-pointer ${isWhiteNavbar ? "text-salon-dark" : "text-white"}`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white w-full border-t border-gray-100 absolute left-0 top-full py-6 px-6 flex flex-col gap-4 shadow-lg text-salon-dark animate-in fade-in slide-in-from-top-5 duration-200">
          {["/", "/services", "/about", "/contact"].map((path) => (
            <Link 
              key={path}
              href={path} 
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium capitalize ${isActive(path) ? "text-salon-pink" : ""}`}
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </Link>
          ))}
          
          <hr className="border-gray-100 my-2" />

          {user ? (
            <div className="flex flex-col gap-3">
              <div className="bg-slate-50 p-3 rounded-xl">
                <p className="text-xs text-slate-400">Hello,</p>
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                <span className="inline-block mt-1 text-[10px] bg-pink-100 text-salon-pink px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">{user.role || "User"}</span>
              </div>
              
            
              {user.role === "admin" ? (
                <>
                  <Link href="/admin/add-service" onClick={() => setIsOpen(false)} className="text-sm font-medium text-slate-600 pl-1">Add Service</Link>
                  <Link href="/admin/manage-services" onClick={() => setIsOpen(false)} className="text-sm font-medium text-slate-600 pl-1">Manage Services</Link>
                  <Link href="/admin/manage-users" onClick={() => setIsOpen(false)} className="text-sm font-medium text-slate-600 pl-1">Manage Users</Link>
                </>
              ) : (
                <>
                  <Link href="/my-bookings" onClick={() => setIsOpen(false)} className="text-sm font-medium text-slate-600 pl-1">My Bookings</Link>
                  <Link href="/services" onClick={() => setIsOpen(false)} className="text-sm font-medium text-slate-600 pl-1">Services</Link>
                </>
              )}

              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-sm font-medium text-slate-600 pl-1">Dashboard</Link>
              
              <button
                onClick={handleLogout}
                className="text-left text-sm font-bold text-red-500 cursor-pointer pt-2 border-t border-slate-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-base font-medium hover:text-salon-pink">Login</Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="btn-pink text-center w-full py-2.5!">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}