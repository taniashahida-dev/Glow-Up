import { Skeleton } from "@heroui/react";
import { Plus, Search } from "lucide-react";

export default function ManageServicesLoading() {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header Section Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            {/* Title Skeleton */}
            <Skeleton animationType="shimmer" className="h-8 w-48 rounded-lg" />
            {/* Subtitle Skeleton */}
            <Skeleton animationType="shimmer" className="h-4 w-64 rounded-md" />
          </div>

          {/* Add Service Button Skeleton lookalike */}
          <div className="bg-slate-200/60 rounded-salon text-xs px-5 h-10 flex items-center gap-1.5 w-32 justify-center opacity-60">
            <Plus size={16} strokeWidth={2.5} className="text-slate-400" />
            <Skeleton animationType="shimmer" className="h-3 w-16 rounded" />
          </div>
        </div>

        {/* Core Table & Search Bar Skeleton Container */}
        <div className="bg-white rounded-salon border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Search and Meta Stats Bar Skeleton */}
          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 bg-white">
            <div className="w-full sm:max-w-xs relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none z-10"
              />
              {/* Input Skeleton */}
              <div className="w-full h-10 border border-slate-100 rounded-salon bg-slate-50/50 flex items-center pl-9">
                <Skeleton animationType="shimmer" className="h-3 w-32 rounded" />
              </div>
            </div>

            {/* Total count meta text skeleton */}
            <Skeleton animationType="shimmer" className="h-4 w-20 rounded" />
          </div>

          {/* Table Skeleton */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-6 w-[40%]">
                    Service
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[15%]">
                    Category
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[12%]">
                    Price
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[13%]">
                    Duration
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[10%]">
                    Rating
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center pr-6 w-[10%]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {/* Generating 5 dummy shimmer table rows */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="transition-colors">
                    {/* Service Column */}
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3.5">
                        {/* Avatar / Image circle skeleton */}
                        <Skeleton
                          animationType="shimmer"
                          className="w-11 h-11 rounded-full shrink-0"
                        />
                        <div className="flex-1 space-y-2">
                          {/* Title skeleton */}
                          <Skeleton
                            animationType="shimmer"
                            className="h-4 w-2/3 rounded"
                          />
                          {/* Short description skeleton */}
                          <Skeleton
                            animationType="shimmer"
                            className="h-3 w-1/2 rounded"
                          />
                        </div>
                      </div>
                    </td>

                    {/* Category Column */}
                    <td className="p-4">
                      <Skeleton
                        animationType="shimmer"
                        className="h-6 w-16 rounded-full"
                      />
                    </td>

                    {/* Price Column */}
                    <td className="p-4">
                      <Skeleton
                        animationType="shimmer"
                        className="h-4 w-10 rounded"
                      />
                    </td>

                    {/* Duration Column */}
                    <td className="p-4">
                      <Skeleton
                        animationType="shimmer"
                        className="h-4 w-12 rounded"
                      />
                    </td>

                    {/* Rating Column */}
                    <td className="p-4">
                      <Skeleton
                        animationType="shimmer"
                        className="h-4 w-8 rounded"
                      />
                    </td>

                    {/* Actions Column */}
                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit Button skeleton */}
                        <Skeleton
                          animationType="shimmer"
                          className="h-8 w-8 rounded-full"
                        />
                        {/* Delete Button skeleton */}
                        <Skeleton
                          animationType="shimmer"
                          className="h-8 w-8 rounded-full"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}