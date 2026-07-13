import Link from "next/link";
import { Plus } from "lucide-react";

import { getServices } from "@/lib/api/service";
import ServicesTable from "./ServicesTable";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function ManageServicePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentSearch = resolvedParams.search || "";
  const currentPage = resolvedParams.page || "1";

  const queryParams = `search=${encodeURIComponent(currentSearch)}&page=${currentPage}&limit=100`;

  const data = await getServices(queryParams);
  const services = data?.services || [];

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-slate-950">
              Manage Services
            </h1>
            <p className="text-slate-500 text-sm">
              View, edit, and manage all salon services
            </p>
          </div>

          <Link
            href="/admin/add-service"
            className="bg-salon-pink text-white font-semibold rounded-salon text-xs px-5 h-10 flex items-center gap-1.5 shadow-xs hover:opacity-90 transition-opacity"
          >
            <Plus size={16} strokeWidth={2.5} />
            Add Service
          </Link>
        </div>

        {/* Client Side Core Table & Search */}
        <ServicesTable initialServices={services} />
      </div>
    </div>
  );
}
