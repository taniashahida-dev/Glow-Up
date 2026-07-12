import { DashboardAnalyticsResponse } from "@/app/types/dashboard";
import { serverFetch } from "../core/server";
import { getAccessToken } from "./token";

// Admin only — stats + monthly chart data for the admin dashboard
export const getDashboardAnalytics = async (): Promise<DashboardAnalyticsResponse> => {
  const token = await getAccessToken();
  return serverFetch<DashboardAnalyticsResponse>(
    "/api/admin/dashboard-analytics",
    {},
    token
  );
};