import DashboardChartsSection from "@/components/shared/DashboardChartsSection";
import DashboardStatsSection from "@/components/shared/DashboardStatsSection";
import {
  Compass,
  MessageSquareText,
  Heart,
  TicketCheck,
} from "lucide-react";
import {
  getTouristDashboardCharts,
  getTouristDashboardStats,
} from "@/services/dashboard/dashboardStats";

export default async function TouristPage() {
  const [statsData, charts] = await Promise.all([
    getTouristDashboardStats(),
    getTouristDashboardCharts(),
  ]);

  const stats = [
    {
      title: "My Bookings",
      value: statsData.totalBookings.toString(),
      hint: "Fetched from /auth/me",
      icon: TicketCheck,
    },
    {
      title: "My Reviews",
      value: statsData.totalReviews.toString(),
      hint: "Fetched from /auth/me",
      icon: MessageSquareText,
    },
    {
      title: "Available Listings",
      value: statsData.availableListings.toString(),
      hint: "Fetched from /listing/public",
      icon: Heart,
    },
    {
      title: "Preference Tags",
      value: statsData.preferenceCount.toString(),
      hint: "Parsed from profile preferences",
      icon: Compass,
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <DashboardStatsSection
        heading="Tourist Dashboard"
        description="Your personal travel summary at a glance."
        stats={stats}
      />
      <DashboardChartsSection charts={charts} />
    </div>
  );
}
