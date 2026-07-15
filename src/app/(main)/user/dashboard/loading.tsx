import { Skeleton } from "@heroui/react";

export default function UserDashboardLoading() {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Banner Skeleton */}
        <div className="bg-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 z-10 w-full sm:w-auto">
            {/* Title Skeleton */}
            <Skeleton animationType="shimmer" className="h-8 w-64 rounded-xl bg-slate-300" />
            {/* Subtitle Skeleton */}
            <div className="space-y-2">
              <Skeleton animationType="shimmer" className="h-3.5 w-80 rounded bg-slate-300" />
              <Skeleton animationType="shimmer" className="h-3.5 w-60 rounded bg-slate-300" />
            </div>
          </div>
          {/* Action Button Skeleton */}
          <Skeleton animationType="shimmer" className="h-10 w-32 rounded-xl bg-slate-300 shrink-0" />
        </div>

        {/* 4 Stats Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between h-[104px]"
            >
              <div className="space-y-2.5">
                {/* Title text skeleton */}
                <Skeleton animationType="shimmer" className="h-3 w-24 rounded" />
                {/* Value/Number skeleton */}
                <Skeleton animationType="shimmer" className="h-8 w-16 rounded-md" />
              </div>
              {/* Icon Circle skeleton */}
              <Skeleton animationType="shimmer" className="w-12 h-12 rounded-xl" />
            </div>
          ))}
        </div>

        {/* Charts Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Monthly Spending History Bar Chart Skeleton (lg:col-span-2) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <Skeleton animationType="shimmer" className="h-5 w-44 rounded-md" />
              <Skeleton animationType="shimmer" className="h-3 w-56 rounded" />
            </div>
            
            {/* Monthly Bar Chart Simulation */}
            <div className="h-72 w-full flex items-end justify-between gap-4 pt-4 px-2">
              {[45, 75, 50, 90, 60, 80].map((heightPct, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                  <Skeleton
                    animationType="shimmer"
                    className="w-full max-w-[35px] rounded-t-lg bg-pink-100"
                    style={{ height: `${heightPct}%` }}
                  />
                  <Skeleton animationType="shimmer" className="h-3 w-10 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Services Pie/Donut Chart Skeleton */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between h-[416px]">
            <div className="space-y-2">
              <Skeleton animationType="shimmer" className="h-5 w-36 rounded-md" />
              <Skeleton animationType="shimmer" className="h-3 w-48 rounded" />
            </div>

            {/* Pie Chart Representation */}
            <div className="flex justify-center items-center py-4">
              <div className="relative w-36 h-36 rounded-full border-[14px] border-slate-100 flex items-center justify-center">
                <Skeleton animationType="shimmer" className="w-12 h-4 rounded-md" />
              </div>
            </div>

            {/* Service legend list skeleton */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center pt-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <Skeleton animationType="shimmer" className="w-2.5 h-2.5 rounded-full" />
                  <Skeleton animationType="shimmer" className="h-3 w-16 rounded" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Booking Prompt Callout Skeleton */}
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton animationType="shimmer" className="h-4.5 w-80 rounded-md" />
            <Skeleton animationType="shimmer" className="h-3 w-96 rounded" />
          </div>
          <Skeleton animationType="shimmer" className="h-5 w-36 rounded-md self-start md:self-auto" />
        </div>

      </div>
    </div>
  );
}