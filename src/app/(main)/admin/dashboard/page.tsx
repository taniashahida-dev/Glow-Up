import { getDashboardAnalytics } from "@/lib/api/dashboard";
import DashboardOverviewClient from "@/components/dashboard/DashboardOverviewClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverview() {
  let data = null;
  let isError = false;

  try {
    data = await getDashboardAnalytics();
  } catch (error) {
    console.error("Dashboard data fetching failed:", error);
    isError = true;
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-semibold">
          Failed to load dashboard statistics.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-[#fafafa] min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-salon-dark">
          Dashboard Overview
        </h1>
        <p className="text-sm text-salon-muted mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <DashboardOverviewClient data={data} />
    </div>
  );
}