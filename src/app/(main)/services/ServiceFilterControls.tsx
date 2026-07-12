"use client";

import { Search, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const categories = [
  "All",
  "Hair",
  "Skin",
  "Nails",
  "Brows",
  "Waxing",
  "Makeup",
];

export default function ServiceFilterControls({
  totalItems,
}: {
  totalItems: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // URL Query Parameters Update Function
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "All" && value !== "all" && value !== "default") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");

    startTransition(() => {
      router.push(`/services?${params.toString()}`);
    });
  };

  const currentCategory = searchParams.get("category") || "All";
  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sortBy") || "default";

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-salon-muted">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search services..."
            defaultValue={currentSearch}
            onChange={(e) => updateFilters("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-hidden focus:border-salon-pink text-sm transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="relative w-full sm:w-48">
            <select
              value={currentCategory}
              onChange={(e) => updateFilters("category", e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-salon-dark focus:outline-hidden focus:border-salon-pink focus:ring-1 focus:ring-salon-pink cursor-pointer transition-all"
            >
              <option value="All">All Categories</option>
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-salon-muted">
              <ChevronDown size={16} />
            </span>
          </div>

          <div className="relative w-full sm:w-48">
            <select
              value={currentSort}
              onChange={(e) => updateFilters("sortBy", e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-salon-dark focus:outline-hidden focus:border-salon-pink focus:ring-1 focus:ring-salon-pink cursor-pointer transition-all"
            >
              <option value="default">Default Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Popularity</option>
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-salon-muted">
              <ChevronDown size={16} />
            </span>
          </div>
        </div>
      </div>

      {/* Figma Exact Category Pills */}
      <div className="flex flex-wrap gap-2 items-center">
        {categories.map((cat) => {
          const isActive = currentCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => updateFilters("category", cat)}
              className={`px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer border border-transparent ${
                isActive
                  ? "bg-salon-pink text-white shadow-xs"
                  : "bg-white border-slate-200 text-salon-dark hover:border-salon-pink hover:text-salon-pink hover:bg-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="text-sm font-semibold text-salon-muted pl-1">
        {isPending ? (
          <span className="text-salon-pink animate-pulse">
            Updating menu...
          </span>
        ) : (
          `${totalItems} services found`
        )}
      </div>
    </div>
  );
}
