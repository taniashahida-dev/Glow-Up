import {
  DashboardAnalyticsResponse,
  UserDashboardAnalyticsResponse,
} from "@/app/types/dashboard";
import { serverFetch } from "../core/server";
import { getAccessToken } from "./token";

export const getDashboardAnalytics = async (): Promise<DashboardAnalyticsResponse> => {
  const token = await getAccessToken();
  return serverFetch<DashboardAnalyticsResponse>(
    "/api/admin/dashboard-analytics",
    {},
    token
  );
};

// Logged-in user — their own booking stats + spend charts
export const getUserDashboardAnalytics = async (): Promise<UserDashboardAnalyticsResponse> => {
  const token = await getAccessToken();
  return serverFetch<UserDashboardAnalyticsResponse>(
    "/api/user/dashboard-analytics",
    {},
    token
  );
};