import { Skeleton } from "@heroui/react";

export default function ServicesLoading() {
  // পেজিনেশন অনুযায়ী গ্রিডে ৮টি ডামি স্কেলেটন কার্ড দেখানোর জন্য
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 px-4 mt-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section Skeleton */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <Skeleton
            animationType="shimmer"
            className="h-6 w-24 rounded-full"
          />
          <Skeleton
            animationType="shimmer"
            className="h-10 w-48 md:w-64 rounded-lg"
          />
          <Skeleton
            animationType="shimmer"
            className="h-4 w-72 md:w-96 rounded-lg"
          />
        </div>

        {/* Filter Controls Skeleton */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
          <Skeleton animationType="shimmer" className="h-10 w-full md:max-w-md rounded-lg" />
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <Skeleton animationType="shimmer" className="h-10 w-full sm:w-48 rounded-lg" />
            <Skeleton animationType="shimmer" className="h-10 w-full sm:w-48 rounded-lg" />
          </div>
        </div>

        {/* Category Pills Skeleton */}
        <div className="flex flex-wrap gap-2 items-center">
          {Array.from({ length: 7 }).map((_, idx) => (
            <Skeleton
              key={idx}
              animationType="shimmer"
              className="h-8 w-20 rounded-full"
            />
          ))}
        </div>

        {/* Services Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skeletonCards.map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden h-full flex flex-col justify-between"
            >
              {/* Image & Tag Skeleton */}
              <div className="relative aspect-video w-full">
                <Skeleton animationType="shimmer" className="w-full h-full" />
              </div>

              {/* Content Skeleton */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-3">
                  {/* Title */}
                  <Skeleton animationType="shimmer" className="h-5 w-4/5 rounded-lg" />
                  {/* Description Lines */}
                  <div className="space-y-2">
                    <Skeleton animationType="shimmer" className="h-3 w-full rounded-lg" />
                    <Skeleton animationType="shimmer" className="h-3 w-5/6 rounded-lg" />
                  </div>
                </div>

                {/* Rating & Duration */}
                <div className="flex items-center justify-between pt-2">
                  <Skeleton animationType="shimmer" className="h-4 w-12 rounded-lg" />
                  <Skeleton animationType="shimmer" className="h-4 w-16 rounded-lg" />
                </div>

                {/* Footer Price & Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Skeleton animationType="shimmer" className="h-6 w-14 rounded-lg" />
                  <Skeleton animationType="shimmer" className="h-8 w-24 rounded-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}