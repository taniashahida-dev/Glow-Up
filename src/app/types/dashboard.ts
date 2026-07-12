export interface DashboardStats {
  totalServices: number;
  totalBookings: number;
  totalRevenue: number;
  totalCustomers: number;
}

export interface MonthlyChartDataPoint {
  month: string; // e.g. "2026-07"
  bookings: number;
}

export interface DashboardAnalyticsResponse {
  stats: DashboardStats;
  chartData: MonthlyChartDataPoint[];
}