import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  FileText,
  Phone,
  User,
  Tag,
  ArrowRight,
} from "lucide-react";
import { getMyBookings } from "@/lib/api/bookings";
import { Booking } from "@/app/types/booking";

export const revalidate = 0;

export default async function MyBookingPage() {
  let bookings: Booking[] = [];
  let fetchError: string | null = null;

  try {
    bookings = await getMyBookings();
  } catch (error) {
    fetchError =
      error instanceof Error ? error.message : "Failed to load your bookings.";
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              My Appointments
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Review and manage your scheduled beauty and salon sessions.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-salon-pink text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xs hover:bg-opacity-90 transition-all self-start md:self-auto"
          >
            Book Another Session <ArrowRight size={16} />
          </Link>
        </div>

        {/* Error State */}
        {fetchError ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-rose-100 shadow-xs max-w-md mx-auto mt-12">
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mx-auto mb-4">
              <Calendar size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Couldn&apos;t Load Bookings
            </h3>
            <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
              {fetchError}
            </p>
          </div>
        ) : bookings.length === 0 ? (
          /* 📋 বুকিং না থাকলে এই এম্পটি স্টেট দেখাবে */
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-xs max-w-md mx-auto mt-12">
            <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-salon-pink mx-auto mb-4">
              <Calendar size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No Bookings Found
            </h3>
            <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
              You haven`t scheduled any appointments yet. Explore our premier
              services to get started!
            </p>
            <Link
              href="/services"
              className="mt-6 inline-block bg-salon-pink text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-transform active:scale-95"
            >
              Explore Services
            </Link>
          </div>
        ) : (
          /* 📋 বুকিং লিস্ট গ্রিড */
          <div className="space-y-4">
            {bookings.map((booking: Booking) => {
              // ডেট ফরম্যাটিং (যেমন: July 12, 2026)
              const formattedDate = new Date(
                booking.bookingDate,
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <div
                  key={booking._id}
                  className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 transition-all hover:shadow-md hover:border-slate-200"
                >
                  {/* ১. সার্ভিস ও কাস্টমার ইনফো সেকশন */}
                  <div className="flex gap-4 items-start md:items-center w-full lg:w-auto">
                    {booking.serviceDetails?.image ? (
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                        <Image
                          src={booking.serviceDetails.image}
                          alt={booking.serviceDetails.title || "Service"}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-pink-50 text-salon-pink flex items-center justify-center shrink-0">
                        <Tag size={24} />
                      </div>
                    )}

                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-salon-pink bg-pink-50 px-2 py-0.5 rounded-md">
                        {booking.serviceDetails?.category || "Salon"}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                        {booking.serviceDetails?.title ||
                          "Exclusive Salon Service"}
                      </h3>

                      {/* কাস্টমার ডিটেইলস মেটা */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <User size={12} className="text-slate-400" />{" "}
                          {booking.customerName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={12} className="text-slate-400" />{" "}
                          {booking.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ২. ডেট ও টাইম স্লট সেকশন */}
                  <div className="flex flex-wrap gap-3 text-sm text-slate-700 font-semibold w-full sm:w-auto">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
                      <Calendar size={15} className="text-salon-pink" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
                      <Clock size={15} className="text-salon-pink" />
                      <span className="uppercase">{booking.time}</span>
                    </div>
                  </div>

                  {/* ৩. প্রাইস, নোট এবং স্ট্যাটাস */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                    {/* কাস্টমার নোট পপওভার বা ইন্ডিকেটর (যদি থাকে) */}
                    {booking.notes && (
                      <div
                        className="group relative cursor-pointer"
                        title={booking.notes}
                      >
                        <FileText
                          size={18}
                          className="text-slate-400 hover:text-salon-pink transition-colors"
                        />
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-900 text-white text-[11px] py-1.5 px-3 rounded-lg w-48 text-center shadow-lg z-10 font-normal">
                          {`"${booking.notes}"`}
                        </div>
                      </div>
                    )}

                    <div className="text-left lg:text-right">
                      <p className="text-xs text-slate-400 font-medium">
                        Total Price
                      </p>
                      <span className="text-xl font-black text-slate-900">
                        ${booking.price}
                      </span>
                    </div>

                    {/* ডাইনামিক ব্যাজ কালার */}
                    <span
                      className={`text-xs font-bold px-3.5 py-1.5 rounded-full capitalize select-none border ${
                        booking.status === "completed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : booking.status === "confirmed"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : booking.status === "cancelled"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : "bg-amber-50 text-amber-700 border-amber-200" // Default: pending
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
