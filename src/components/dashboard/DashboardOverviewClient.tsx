"use client";

import { Calendar, DollarSign, Users, Star } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { DashboardAnalyticsResponse } from "@/app/types/dashboard";

interface Props {
  data: DashboardAnalyticsResponse;
}

export default function DashboardOverviewClient({ data }: Props) {
  const { stats, chartData } = data;

  const formattedChartData = chartData.map((item) => {
    const [yearStr, monthStr] = item.month.split("-");

    const year = Number(yearStr) || new Date().getFullYear();
    const month = Number(monthStr) || 1;
    const date = new Date(year, month - 1, 1);

    return {
      name: date.toLocaleString("en-US", { month: "short" }),
      Bookings: item.bookings,
      Revenue: item.bookings * 75,
    };
  });

  const cards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings.toLocaleString(),
      growth: "+12%",
      icon: <Calendar className="text-pink-500 w-5 h-5" />,
      bg: "bg-pink-50",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      growth: "+18%",
      icon: <DollarSign className="text-purple-500 w-5 h-5" />,
      bg: "bg-purple-50",
    },
    {
      title: "Active Clients",
      value: stats.totalCustomers.toLocaleString(),
      growth: "+8%",
      icon: <Users className="text-amber-500 w-5 h-5" />,
      bg: "bg-amber-50",
    },
    {
      title: "Avg Rating",
      value: `${stats.totalServices > 0 ? "4.9" : "0.0"} ★`,
      growth: "+0.1",
      icon: <Star className="text-emerald-500 w-5 h-5" />,
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-salon border border-slate-100 shadow-xs flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl ${card.bg}`}>{card.icon}</div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {card.growth}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-black text-slate-900">
                {card.value}
              </h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5 uppercase tracking-wider">
                {card.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Trends Line Chart */}
        <div className="bg-white p-5 rounded-salon border border-slate-100 shadow-xs lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800">
              Booking Trends
            </h3>
            <p className="text-xs text-slate-400">Monthly bookings overview</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={formattedChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorBookings"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <Tooltip
                  wrapperStyle={{
                    borderRadius: "8px",
                    fontSize: "12px",
                    border: "1px solid #f1f5f9",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="Bookings"
                  stroke="#ec4899"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorBookings)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Mock Box to fill Figma Space */}
        <div className="bg-white p-5 rounded-salon border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Service Distribution
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Bookings by top categories
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-6">
            {/* Donut Simulation via simple CSS */}
            <div className="w-32 h-32 rounded-full border-14 border-pink-500 border-t-purple-500 border-r-amber-500 flex items-center justify-center">
              <span className="text-xs font-bold text-slate-700">
                Top Categories
              </span>
            </div>
          </div>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-pink-500 rounded-full"></span>
                Facial / Hair
              </span>
              <span>64%</span>
            </div>
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-purple-500 rounded-full"></span>
                Wellness
              </span>
              <span>22%</span>
            </div>
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                Others
              </span>
              <span>14%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Monthly Revenue Gradient Bar Chart */}
      <div className="bg-white p-5 rounded-salon border border-slate-100 shadow-xs">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800">
            Monthly Revenue
          </h3>
          <p className="text-xs text-slate-400">
            Total estimated incoming analytics
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedChartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
              />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                wrapperStyle={{ borderRadius: "8px", fontSize: "12px" }}
              />
              {/* Figma Styled Gradient Simulation Color */}
              <Bar
                dataKey="Revenue"
                fill="#a855f7"
                radius={[6, 6, 0, 0]}
                maxBarSize={45}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
