
import Link from "next/link";
import {
  Sparkles,
  CalendarCheck,
  Hourglass,
  CreditCard,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { getUserDashboardAnalytics } from "@/lib/api/dashboard";
import UserDashboardCharts from "@/components/dashboard/UserDashboardCharts";

export const revalidate = 0;

export default async function UserDashboard() {
  const dashboardData = await getUserDashboardAnalytics();
  const { stats, charts } = dashboardData;

  return (
    <div className="bg-[#f8fafc] min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-linear-to-r from-pink-300 to-pink-500 rounded-3xl p-6 sm:p-8  flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2">
            <h1 className="text-2xl text-white sm:text-3xl font-bold tracking-tight flex items-center gap-2">
              Welcome to Your Dashboard{" "}
              <Sparkles className="text-salon-pink animate-pulse" size={24} />
            </h1>
            <p className="text-white text-sm max-w-md">
              Monitor your appointment analytics, manage beauty schedules, and
              inspect your preferences.
            </p>
          </div>
          <Link
            href="/user/my-bookings"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all backdrop-blur-md"
          >
            View Bookings <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Total Bookings
              </p>
              <h2 className="text-3xl font-black text-slate-900">
                {stats.totalBookings}
              </h2>
            </div>
            <div className="w-12 h-12 bg-pink-50 text-salon-pink rounded-xl flex items-center justify-center">
              <CalendarCheck size={22} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Pending Sessions
              </p>
              <h2 className="text-3xl font-black text-slate-900">
                {stats.pendingBookings}
              </h2>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
              <Hourglass size={22} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Completed Sessions
              </p>
              <h2 className="text-3xl font-black text-slate-900">
                {stats.completedBookings}
              </h2>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
              <CalendarCheck size={22} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Total Invested
              </p>
              <h2 className="text-3xl font-black text-slate-900">
                ${stats.totalSpent}
              </h2>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <CreditCard size={22} />
            </div>
          </div>
        </div>

        <UserDashboardCharts
          monthlyExpense={charts.monthlyExpense}
          categoryAnalysis={charts.categoryAnalysis}
        />

        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Need a fresh new look or a quick grooming session?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore our professional boutique hair, skin, and wellness
              treatments.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-salon-pink hover:text-opacity-80 transition-colors self-start md:self-auto"
          >
            Book an Appointment <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
