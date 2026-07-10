"use client";

import { motion } from "framer-motion";
import { Scissors, Calendar, DollarSign, Users } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Jan", bookings: 50, revenue: 4000 },
  { name: "Feb", bookings: 55, revenue: 5200 },
  { name: "Mar", bookings: 62, revenue: 6100 },
  { name: "Apr", bookings: 70, revenue: 7300 },
  { name: "May", bookings: 85, revenue: 9000 },
  { name: "Jun", bookings: 98, revenue: 11000 },
  { name: "Jul", bookings: 110, revenue: 13500 },
];

const stats = [
  {
    id: 1,
    label: "Total Services",
    value: "42",
    sub: "Across 5 categories",
    icon: Scissors,
    iconBg: "bg-pink-100 text-salon-pink",
  },
  {
    id: 2,
    label: "Appointments",
    value: "1,284",
    sub: "Booked this year",
    icon: Calendar,
    iconBg: "bg-purple-100 text-purple-500",
  },
  {
    id: 3,
    label: "Revenue",
    value: "$48.9K",
    sub: "Monthly average",
    icon: DollarSign,
    iconBg: "bg-amber-100 text-amber-500",
  },
  {
    id: 4,
    label: "Happy Clients",
    value: "892+",
    sub: "And growing",
    icon: Users,
    iconBg: "bg-rose-100 text-rose-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
} as const;

export default function SuccessStory() {
  return (
    <section className="py-24 bg-linear-to-b from-pink-50/70 via-purple-50/40 to-pink-50/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-orange-50 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-orange-100">
            By The Numbers
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-salon-dark mb-4 tracking-tight">
            Our Growing Success Story
          </h2>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 25px -5px rgba(15, 23, 42, 0.05)",
                }}
                className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col items-start transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${stat.iconBg}`}
                >
                  <IconComp size={18} strokeWidth={2} />
                </div>
                <span className="text-3xl font-extrabold text-salon-dark tracking-tight mb-1">
                  {stat.value}
                </span>
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-salon-muted font-light">
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring" as const }}
          className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)]"
        >
          <div className="mb-6">
            <h3 className="text-base md:text-lg font-bold text-salon-dark">
              Monthly Bookings & Revenue Trend
            </h3>
          </div>

          <div className="w-full h-80 md:h-100">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #f1f5f9",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ec4899"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#chartGlow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}