"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { MonthlyExpensePoint, CategoryAnalysisPoint } from "@/app/types/dashboard";

interface ChartsProps {
  monthlyExpense: MonthlyExpensePoint[];
  categoryAnalysis: CategoryAnalysisPoint[];
}

const COLORS = ["#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

export default function UserDashboardCharts({ monthlyExpense, categoryAnalysis }: ChartsProps) {
  
  const formatMonth = (monthStr: string) => {
    try {
      const [year, month] = monthStr.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch {
      return monthStr;
    }
  };

  const formattedBarData = monthlyExpense.map((item) => ({
    ...item,
    displayMonth: formatMonth(item.month),
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs lg:col-span-2">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900">Monthly Spending History</h3>
          <p className="text-xs text-slate-500">Track how much you invest in your styles monthly.</p>
        </div>
        <div className="h-72 w-full">
          {formattedBarData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-slate-400">No data available</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formattedBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="displayMonth" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} unit="$" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff" }}
                  labelClassName="text-xs font-bold text-slate-400"
                />
                <Bar dataKey="amount" fill="#ec4899" radius={[6, 6, 0, 0]} name="Total Spent ($)" barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900">Favorite Services</h3>
          <p className="text-xs text-slate-500">Distribution based on your booking count.</p>
        </div>
        <div className="h-72 w-full flex flex-col justify-between">
          {categoryAnalysis.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-slate-400">No data available</div>
          ) : (
            <>
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryAnalysis}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="category"
                    >
                      {categoryAnalysis.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "8px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center pb-2">
                {categoryAnalysis.map((item, index) => (
                  <div key={item.category} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 capitalize">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    {item.category} ({item.value})
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}