import { getServiceDetails } from "@/lib/api/service";

import ServiceDetailsClient from "./ServiceDetailsClient";
import { getUserSession } from "@/lib/core/session";

export type AuthUser = Awaited<ReturnType<typeof getUserSession>>;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ServicesDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const [user, serviceData] = await Promise.all([
    getUserSession(),
    getServiceDetails(id).catch(() => null),
  ]);

  if (!serviceData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <p className="text-slate-500 font-medium">Service not found.</p>
      </div>
    );
  }

  return (
    <ServiceDetailsClient
      serviceData={serviceData}
      user={user}
      params={params}
    />
  );
}
