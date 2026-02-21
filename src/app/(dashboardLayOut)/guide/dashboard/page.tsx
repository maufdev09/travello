import DashboardChartsSection from "@/components/shared/DashboardChartsSection";
import DashboardStatsSection from "@/components/shared/DashboardStatsSection";
import {
  CalendarCheck2,
  CheckCircle2,
  MapPinned,
  Star,
} from "lucide-react";
import {
  getGuideDashboardCharts,
  getGuideDashboardStats,
} from "@/services/dashboard/dashboardStats";

async function GuidDashboardPage() {
  const [statsData, charts] = await Promise.all([
    getGuideDashboardStats(),
    getGuideDashboardCharts(),
  ]);

  const stats = [
    {
      title: "Total Listings",
      value: statsData.totalListings.toString(),
      hint: "Fetched from /listing",
      icon: MapPinned,
    },
    {
      title: "Active Listings",
      value: statsData.activeListings.toString(),
      hint: "From listing status",
      icon: CheckCircle2,
    },
    {
      title: "Upcoming Slots",
      value: statsData.upcomingAvailability.toString(),
      hint: "From listing availabilities",
      icon: CalendarCheck2,
    },
    {
      title: "Average Rating",
      value:
        typeof statsData.averageRating === "number"
          ? statsData.averageRating.toFixed(1)
          : "N/A",
      hint: "From listing reviews",
      icon: Star,
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <DashboardStatsSection
        heading="Guide Dashboard"
        description="Track your listings, bookings, and guest feedback."
        stats={stats}
      />
      <DashboardChartsSection charts={charts} />
    </div>
  );
}

export default GuidDashboardPage;
