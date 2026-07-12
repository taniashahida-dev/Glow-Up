import { Service, ServicePageParams } from "@/app/types/service";
import Image from "next/image";
import ServiceFilterControls from "./ServiceFilterControls";
import { getServices } from "@/lib/api/service";
import { Clock, Star } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<ServicePageParams>;
}

export default async function ServicesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  const search = resolvedParams.search || "";
  const category = resolvedParams.category || "";
  const sortBy = resolvedParams.sortBy || "newest";
  const page = resolvedParams.page || "1";

  const queryParams = new URLSearchParams({
    search,
    category,
    sortBy,
    page,
    limit: "8",
  });

  let data = {
    services: [] as Service[],
    pagination: {
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      itemsPerPage: 8,
    },
  };

  try {
    data = await getServices(queryParams.toString());
  } catch (error) {
    console.error("Failed to load services:", error);
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 px-4 mt-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Figma Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-pink-50 text-salon-pink px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
            ✨ Full Menu
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            All{" "}
            <span className="text-glow-gradient italic font-serif">
              Services
            </span>
          </h1>
          <p className="text-salon-muted text-sm md:text-base max-w-md mx-auto">
            Discover every treatment we offer. Filter by category or search by
            name.
          </p>
        </div>

        <ServiceFilterControls pagination={data.pagination} />

        {data.services.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-salon-muted text-lg">
              No services found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.services.map((service: Service) => (
              <div
                key={service._id}
                className="salon-card group h-full justify-between"
              >
                {/* Image & Category Tag */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.image || "/placeholder-salon.jpg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-pink-100/70 rounded-2xl text-pink-400 text-xs font-bold px-2.5 py-1 ">
                    {service.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-salon-dark line-clamp-1 hover:text-salon-pink transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-salon-muted text-xs line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Rating & Duration */}
                  <div className="flex items-center justify-between text-xs text-salon-muted font-medium pt-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={15} />{" "}
                      <span>{service.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={15} /> <span>{service.duration} min</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-lg font-extrabold text-salon-pink">
                      ${service.price}
                    </span>
                    <Link
                      href={`/services/${service._id}`}
                      className="border border-salon-pink text-salon-pink rounded-2xl hover:bg-salon-pink hover:text-white transition-all px-4 py-2 text-xs font-bold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
