import { Skeleton } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

export default function ServiceDetailsLoading() {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Back Link Skeleton */}
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400">
          <ArrowLeft size={16} />
          <span>Back to Services</span>
        </div>

        {/* Main Service Card Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-xs">
          
          {/* Left Side: Image Skeleton */}
          <div className="lg:col-span-6 relative aspect-square sm:aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden">
            <Skeleton animationType="shimmer" className="w-full h-full" />
          </div>

          {/* Right Side: Content Details Skeleton */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 lg:py-2">
            <div className="space-y-6">
              {/* Rating & Duration Badges */}
              <div className="flex items-center gap-4">
                <Skeleton animationType="shimmer" className="h-7 w-24 rounded-md" />
                <Skeleton animationType="shimmer" className="h-7 w-24 rounded-md" />
              </div>

              {/* Title */}
              <Skeleton animationType="shimmer" className="h-10 w-4/5 rounded-lg" />

              {/* Price Box */}
              <div className="inline-block bg-pink-50/20 border border-pink-100/30 rounded-xl px-5 py-3 w-32">
                <Skeleton animationType="shimmer" className="h-3 w-10 mb-2 rounded" />
                <Skeleton animationType="shimmer" className="h-8 w-20 rounded" />
              </div>

              {/* Descriptions */}
              <div className="space-y-3 pt-2">
                {/* Short Desc (Bordered layout lookalike) */}
                <div className="border-l-2 border-pink-100 pl-3">
                  <Skeleton animationType="shimmer" className="h-4 w-11/12 rounded" />
                </div>
                {/* Main Desc Paragraphs */}
                <div className="space-y-2 pt-2">
                  <Skeleton animationType="shimmer" className="h-3 w-full rounded" />
                  <Skeleton animationType="shimmer" className="h-3 w-full rounded" />
                  <Skeleton animationType="shimmer" className="h-3 w-4/5 rounded" />
                </div>
              </div>
            </div>

            {/* Book Button Area */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <Skeleton animationType="shimmer" className="h-14 w-full rounded-xl" />
              <div className="flex items-center justify-center">
                <Skeleton animationType="shimmer" className="h-4 w-60 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Related Services Skeleton Section */}
        <div className="space-y-6 pt-6">
          <Skeleton animationType="shimmer" className="h-8 w-48 rounded-lg" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-2xs flex flex-col justify-between h-full"
              >
                {/* Related Image */}
                <div className="relative aspect-video w-full">
                  <Skeleton animationType="shimmer" className="w-full h-full" />
                </div>
                {/* Related Content */}
                <div className="p-5 space-y-4">
                  <Skeleton animationType="shimmer" className="h-5 w-3/4 rounded" />
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                    <Skeleton animationType="shimmer" className="h-6 w-12 rounded" />
                    <Skeleton animationType="shimmer" className="h-8 w-24 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}