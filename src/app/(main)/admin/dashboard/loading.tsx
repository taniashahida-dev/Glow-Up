import { Skeleton } from "@heroui/react";

export default function DashboardLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-[#fafafa] min-h-screen">
      
      {/* Top Header Section Skeleton */}
      <div className="space-y-2">
        {/* Title Skeleton */}
        <Skeleton animationType="shimmer" className="h-9 w-64 rounded-lg" />
        {/* Subtitle / Date Skeleton */}
        <Skeleton animationType="shimmer" className="h-4 w-40 rounded-md" />
      </div>

      <div className="space-y-6">
        {/* 4 Stats Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-salon border border-slate-100 shadow-xs flex flex-col justify-between h-32 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                {/* Icon Box Skeleton */}
                <Skeleton animationType="shimmer" className="w-10 h-10 rounded-xl" />
                {/* Growth Badge Skeleton */}
                <Skeleton animationType="shimmer" className="h-5 w-12 rounded-full" />
              </div>
              <div className="space-y-2">
                {/* Value Skeleton */}
                <Skeleton animationType="shimmer" className="h-7 w-24 rounded" />
                {/* Title Skeleton */}
                <Skeleton animationType="shimmer" className="h-3.5 w-20 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Booking Trends Line Chart Skeleton (lg:col-span-2) */}
          <div className="bg-white p-5 rounded-salon border border-slate-100 shadow-xs lg:col-span-2 space-y-4">
            <div>
              <Skeleton animationType="shimmer" className="h-5 w-32 rounded mb-1" />
              <Skeleton animationType="shimmer" className="h-3 w-44 rounded" />
            </div>
            {/* Chart Area Simulation */}
            <div className="h-72 w-full flex items-end gap-3 pt-6 px-2">
              <Skeleton animationType="shimmer" className="w-full h-full rounded-lg opacity-40" />
            </div>
          </div>

          {/* Service Distribution (Donut Chart) Skeleton */}
          <div className="bg-white p-5 rounded-salon border border-slate-100 shadow-xs flex flex-col justify-between h-[412px]">
            <div>
              <Skeleton animationType="shimmer" className="h-5 w-40 rounded mb-1" />
              <Skeleton animationType="shimmer" className="h-3 w-48 rounded" />
            </div>

            {/* Donut Simulation Skeleton */}
            <div className="flex justify-center items-center py-6">
              <div className="relative w-32 h-32 rounded-full border-[12px] border-slate-100 flex items-center justify-center">
                <Skeleton animationType="shimmer" className="w-16 h-4 rounded" />
              </div>
            </div>

            {/* Distribution Legend List Skeleton */}
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Skeleton animationType="shimmer" className="w-3 h-3 rounded-full" />
                    <Skeleton animationType="shimmer" className="h-3 w-20 rounded" />
                  </div>
                  <Skeleton animationType="shimmer" className="h-3 w-8 rounded" />
                </div>
              ))}
            </div>
          </div>

        </div>

     {/* Bottom Monthly Revenue Bar Chart Skeleton */}
<div className="bg-white p-5 rounded-salon border border-slate-100 shadow-xs space-y-4">
  <div>
    <Skeleton animationType="shimmer" className="h-5 w-36 rounded mb-1" />
    <Skeleton animationType="shimmer" className="h-3 w-48 rounded" />
  </div>
  {/* Bar Chart Simulation */}
  <div className="h-64 w-full flex items-end justify-between gap-4 pt-6 px-2">
    {Array.from({ length: 12 }).map((_, idx) => {
      // Math.random() এর বদলে ইনডেক্সের ওপর ভিত্তি করে ফিক্সড হাইট সেট করা হয়েছে
      const presetHeights = ["40%", "70%", "55%", "85%", "45%", "90%", "60%", "75%", "50%", "80%", "35%", "95%"];
      const height = presetHeights[idx % presetHeights.length];

      return (
        <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <Skeleton
            animationType="shimmer"
            className="w-full rounded-t-md"
            style={{ height }}
          />
          <Skeleton animationType="shimmer" className="h-2.5 w-8 rounded" />
        </div>
      );
    })}
  </div>
</div>

      </div>
    </div>
  );
}