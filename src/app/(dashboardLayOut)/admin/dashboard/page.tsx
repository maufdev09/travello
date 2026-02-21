import DashboardChartsSection from "@/components/shared/DashboardChartsSection";
import DashboardStatsSection from "@/components/shared/DashboardStatsSection";
import {
  Building2,
  MapPinned,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  getAdminDashboardCharts,
  getAdminDashboardStats,
} from "@/services/dashboard/dashboardStats";

async function AdminDashboardPage() {
  const [statsData, charts] = await Promise.all([
    getAdminDashboardStats(),
    getAdminDashboardCharts(),
  ]);

  const stats = [
    {
      title: "Total Tourists",
      value: statsData.totalTourists.toString(),
      hint: "Fetched from /user/tourists",
      icon: Users,
    },
    {
      title: "Total Guides",
      value: statsData.totalGuides.toString(),
      hint: "Fetched from /user/guides",
      icon: ShieldCheck,
    },
    {
      title: "Published Listings",
      value: statsData.totalListings.toString(),
      hint: "Fetched from /listing",
      icon: MapPinned,
    },
    {
      title: "Total Admins",
      value: statsData.totalAdmins.toString(),
      hint: "Fetched from /user/admins",
      icon: Building2,
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <DashboardStatsSection
        heading="Admin Dashboard"
        description="Overview of platform activity and operational health."
        stats={stats}
      />
      <DashboardChartsSection charts={charts} />
    </div>
  );
}

export default AdminDashboardPage;
