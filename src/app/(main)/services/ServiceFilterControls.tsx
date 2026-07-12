"use client";

import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { Pagination } from "@heroui/react";

const categories = [
  "All",
  "Hair",
  "Skin",
  "Nails",
  "Brows",
  "Waxing",
  "Makeup",
];

interface PaginationProps {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export default function ServiceFilterControls({
  pagination,
}: {
  pagination: PaginationProps;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const { totalItems, totalPages, currentPage } = pagination;

  // URL Query Parameters Update Function
  const updateFilters = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "All" && value !== "all" && value !== "default") {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }

    if (key !== "page") {
      params.set("page", "1");
    }

    startTransition(() => {
      router.push(`/services?${params.toString()}`);
    });
  };

  const currentCategory = searchParams.get("category") || "All";
  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sortBy") || "default";

  // স্মার্ট পেজিনেশন লজিক (মাঝের পেজ নাম্বার ও Ellipsis দেখানোর জন্য)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("ellipsis-start");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("ellipsis-end");
      pages.push(totalPages);
    }

    return pages;
  };

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

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Categories Dropdown */}
          <div className="relative w-full sm:w-48">
            <select
              value={currentCategory}
              onChange={(e) => updateFilters("category", e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-salon-dark focus:outline-hidden focus:border-salon-pink cursor-pointer transition-all"
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

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-48">
            <select
              value={currentSort}
              onChange={(e) => updateFilters("sortBy", e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-salon-dark focus:outline-hidden focus:border-salon-pink cursor-pointer transition-all"
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

      <div className="text-sm font-semibold text-salon-muted pl-3">
        {isPending ? (
          <span className="text-salon-pink animate-pulse">
            Updating menu...
          </span>
        ) : (
          `${totalItems} services found`
        )}
      </div>

      {/* Figma Category Pills */}
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

      {/* Bottom Counter & HeroUI Anatomy Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        {/* HeroUI Custom Pagination Navigation Anatomy */}
        {totalPages > 1 && (
          <Pagination className="flex items-center">
            <Pagination.Content className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-100 shadow-2xs">
              {/* Previous Button */}
              <Pagination.Item>
                <Pagination.Previous
                  onClick={() => updateFilters("page", currentPage - 1)}
                  isDisabled={currentPage === 1 || isPending}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {/* Dynamic Pages Logic with HeroUI Anatomy Components */}
              {getPageNumbers().map((pageItem, idx) => {
                if (typeof pageItem === "string") {
                  return (
                    <Pagination.Item key={`ellipsis-${idx}`}>
                      <Pagination.Ellipsis className="px-2 text-slate-400 select-none" />
                    </Pagination.Item>
                  );
                }

                const isCurrent = pageItem === currentPage;

                return (
                  <Pagination.Item key={pageItem}>
                    <Pagination.Link
                      isActive={isCurrent}
                      onClick={() => updateFilters("page", pageItem)}
                      isDisabled={isPending}
                      className={`min-w-8.5 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-salon-pink text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {pageItem}
                    </Pagination.Link>
                  </Pagination.Item>
                );
              })}

              {/* Next Button */}
              <Pagination.Item>
                <Pagination.Next
                  onClick={() => updateFilters("page", currentPage + 1)}
                  isDisabled={currentPage === totalPages || isPending}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        )}
      </div>
    </div>
  );
}
