"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  Star,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Sparkles,
  User,
  Phone,
  FileText,
  X,
  Loader2,
} from "lucide-react";
import { createBooking } from "@/lib/api/bookings";
import { ServiceDetailsResponse, Service } from "@/app/types/service";
import { AuthUser } from "./page";
import toast from "react-hot-toast";

interface ClientProps {
  serviceData: ServiceDetailsResponse;
  user: AuthUser;
  params: Promise<{ id: string }>;
}

export default function ServiceDetailsClient({
  serviceData,
  user,
}: ClientProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [notes, setNotes] = useState("");

  const availableSlots = [
    "09:00 AM",
    "11:00 AM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
  ];
  const { service, relatedServices } = serviceData;
  const todayString = new Date().toISOString().split("T")[0];

  const handleOpenBookingModal = () => {
    if (!user) {
      toast.error("Please login first to book an appointment!");
      router.push("/login");
      return;
    }


    const userRole = user?.role 
    if (userRole === "admin") {
      toast.error("Only users can book appointments. If you want to book, please log in with a user account!");
      return;
    }
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!timeSlot) {
     toast.error("Please select a time slot!");
      return;
    }

    if (bookingDate < todayString) {
      toast.error("You cannot select a past date!");
      return;
    }

    const payload = {
      serviceId: service._id as string,
      customerName,
      phoneNumber,
      bookingDate,
      timeSlot,
      notes,
      price: service.price,
    };

    startTransition(async () => {
      try {
        const response = await createBooking(payload);
        if (response.success) {
          toast.success(response.message || "Appointment booked successfully! 🎉");
          setCustomerName("");
          setPhoneNumber("");
          setBookingDate("");
          setTimeSlot("");
          setNotes("");
          setIsOpen(false);
         router.push("/user/my-bookings");
        }
      } catch (error: unknown) {
        console.error("Booking failed:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-salon-muted hover:text-salon-pink transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Services
        </Link>

        {/* Main Service Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-xs">
          {/* Image */}
          <div className="lg:col-span-6 relative aspect-square sm:aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
            <Image
  src={service.image || "/placeholder-salon.jpg"}
  alt={service.title}
  fill
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
            <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs rounded-full text-salon-pink text-xs font-bold px-3 py-1.5 shadow-xs flex items-center gap-1">
              <Sparkles size={12} /> {service.category}
            </span>
          </div>

          {/* Details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 lg:py-2">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-semibold text-salon-muted">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md">
                  <Star size={14} fill="currentColor" />
                  <span>{service.rating.toFixed(1)} Rating</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 text-slate-600 px-2.5 py-1 rounded-md">
                  <Clock size={14} />
                  <span>{service.duration} Mins</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-salon-dark tracking-tight">
                {service.title}
              </h1>

              <div className="inline-block bg-pink-50/50 border border-pink-100 rounded-xl px-5 py-3">
                <span className="text-xs text-salon-pink font-medium block mb-0.5">
                  Price
                </span>
                <span className="text-3xl font-black text-salon-pink">
                  ${service.price}
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-sm font-semibold text-salon-dark border-l-2 border-salon-pink pl-3">
                  {service.shortDescription}
                </p>
                <p className="text-sm text-salon-muted leading-relaxed whitespace-pre-line pt-2">
                  {service.description || "No full description available."}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <button
                onClick={handleOpenBookingModal}
                className="w-full bg-salon-pink hover:bg-salon-pink/90 text-white font-bold py-3.5 px-6 rounded-xl shadow-md shadow-pink-100 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar size={18} />
                Book Appointment Now
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-salon-muted font-medium">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Free cancellation up to 24 hours before</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {relatedServices && relatedServices.length > 0 && (
          <div className="space-y-6 pt-6">
            <h2 className="text-xl md:text-2xl font-bold text-salon-dark">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((related: Service) => (
                <div
                  key={related._id}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-2xs group flex flex-col justify-between h-full"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={related.image || "/placeholder-salon.jpg"}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 space-y-4">
                    <h3 className="text-sm font-bold text-salon-dark line-clamp-1">
                      {related.title}
                    </h3>
                    <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-base font-black text-salon-pink">
                        ${related.price}
                      </span>
                      <Link
                        href={`/services/${related._id}`}
                        className="bg-slate-50 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs transition-opacity duration-300">
          <div
            className="absolute inset-0"
            onClick={() => !isPending && setIsOpen(false)}
          />

          <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-salon-dark">
                    Confirm Booking
                  </h3>
                  <p className="text-xs text-salon-pink font-semibold">
                    {service.title} • ${service.price}
                  </p>
                </div>
                <button
                  disabled={isPending}
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      required
                      disabled={isPending}
                      placeholder="John Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-salon-pink transition-colors disabled:bg-slate-50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      required
                      disabled={isPending}
                      placeholder="+880 1712-XXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-salon-pink transition-colors disabled:bg-slate-50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Select Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={todayString}
                    disabled={isPending}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-salon-pink transition-colors cursor-pointer disabled:bg-slate-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Available Time Slot *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableSlots.map((slot) => {
                      const isSelected = timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isPending}
                          onClick={() => setTimeSlot(slot)}
                          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all border cursor-pointer ${
                            isSelected
                              ? "bg-salon-pink border-salon-pink text-white shadow-xs"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:border-salon-pink hover:text-salon-pink"
                          } disabled:opacity-50`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Special Instructions / Notes
                  </label>
                  <div className="relative">
                    <span className="absolute top-3 left-3 text-slate-400">
                      <FileText size={16} />
                    </span>
                    <textarea
                      rows={3}
                      disabled={isPending}
                      placeholder="Any allergies, preferences or specific requests..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-salon-pink transition-colors resize-none disabled:bg-slate-50"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-salon-pink hover:bg-salon-pink/90 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Calendar size={16} />
                        Confirm & Submit Booking
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="border-t border-slate-100 pt-4 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-2xl mt-8">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">
                  Total Amount Due:
                </span>
                <span className="text-xl font-black text-salon-pink">
                  ${service.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
