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

// ==========================================
//  USER (non-admin) dashboard — different shape from admin's above
// ==========================================
export interface UserDashboardStats {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  totalSpent: number;
}

export interface MonthlyExpensePoint {
  month: string; // e.g. "2026-07"
  amount: number;
  count: number;
}

export interface CategoryAnalysisPoint {
  category: string;
  value: number;
}

export interface UserDashboardAnalyticsResponse {
  stats: UserDashboardStats;
  charts: {
    monthlyExpense: MonthlyExpensePoint[];
    categoryAnalysis: CategoryAnalysisPoint[];
  };
}