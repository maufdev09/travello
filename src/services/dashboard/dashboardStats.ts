"use server";

import { getAllAdmins } from "@/services/admin/adminManagement";
import { getAllGuides } from "@/services/admin/guideManagement";
import { getAllTourists } from "@/services/admin/touristManagement";
import { getUserInfo } from "@/services/auth/getUserInfo";
import {
  getAllListings,
  getAllListingsPublic,
} from "@/services/listing/listingManagement";
import { Listing } from "@/types/ListingType";
import { IAdmin, IGuide, ITourist } from "@/types/userInterface";

type ApiListResponse<T> = {
  success?: boolean;
  meta?: {
    total?: number;
  };
  data?: T[];
};

type DateCarrier = {
  createdAt?: string | Date;
};

type StatShape = {
  totalAdmins: number;
  totalGuides: number;
  totalTourists: number;
  totalListings: number;
};

type GuideStatShape = {
  totalListings: number;
  activeListings: number;
  upcomingAvailability: number;
  averageRating: number | null;
};

type TouristStatShape = {
  totalBookings: number;
  totalReviews: number;
  availableListings: number;
  preferenceCount: number;
};

type DataPoint = {
  label: string;
  value: number;
};

export type DashboardChart = {
  title: string;
  description: string;
  type: "bar" | "line";
  points: DataPoint[];
};

const getTotalFromResponse = <T>(response: ApiListResponse<T>): number => {
  if (typeof response?.meta?.total === "number") {
    return response.meta.total;
  }

  return Array.isArray(response?.data) ? response.data.length : 0;
};

const toNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const toDate = (value: unknown): Date | null => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "string") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return null;
};

const monthLabels = (count = 6): { key: string; label: string }[] => {
  const now = new Date();
  return Array.from({ length: count }).map((_, index) => {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - (count - 1 - index), 1);
    return {
      key: `${monthDate.getFullYear()}-${monthDate.getMonth()}`,
      label: monthDate.toLocaleDateString("en-US", { month: "short" }),
    };
  });
};

const countByLastMonths = <T>(
  items: T[],
  getDateValue: (item: T) => unknown
): DataPoint[] => {
  const buckets = monthLabels();
  const map = new Map<string, number>(buckets.map((bucket) => [bucket.key, 0]));

  items.forEach((item) => {
    const date = toDate(getDateValue(item));
    if (!date) return;
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!map.has(key)) return;
    map.set(key, (map.get(key) || 0) + 1);
  });

  return buckets.map((bucket) => ({
    label: bucket.label,
    value: map.get(bucket.key) || 0,
  }));
};

const topCategoryPoints = (
  listings: Listing[],
  topCount = 6
): DataPoint[] => {
  const frequency = new Map<string, number>();
  listings.forEach((listing) => {
    const key = listing?.category || "UNKNOWN";
    frequency.set(key, (frequency.get(key) || 0) + 1);
  });

  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topCount)
    .map(([label, value]) => ({ label, value }));
};

export const getAdminDashboardStats = async (): Promise<StatShape> => {
  const [adminsRes, guidesRes, touristsRes, listingsRes] = await Promise.all([
    getAllAdmins("limit=1"),
    getAllGuides("limit=1"),
    getAllTourists("limit=1"),
    getAllListings("limit=1"),
  ]);

  return {
    totalAdmins: getTotalFromResponse(adminsRes),
    totalGuides: getTotalFromResponse(guidesRes),
    totalTourists: getTotalFromResponse(touristsRes),
    totalListings: getTotalFromResponse(listingsRes),
  };
};

export const getGuideDashboardStats = async (): Promise<GuideStatShape> => {
  const listingsRes = (await getAllListings("limit=200")) as ApiListResponse<Listing>;
  const listings = Array.isArray(listingsRes?.data) ? listingsRes.data : [];

  const activeListings = listings.filter((listing) => listing?.isActive).length;
  const upcomingAvailability = listings.reduce((total, listing) => {
    const slots = Array.isArray(listing?.availabilities) ? listing.availabilities : [];
    const upcoming = slots.filter((slot) => {
      if (!slot?.startAt) return false;
      return new Date(slot.startAt) > new Date() && !slot?.booked;
    }).length;
    return total + upcoming;
  }, 0);

  const ratings = listings.flatMap((listing) => {
    const reviews = Array.isArray(listing?.reviews) ? listing.reviews : [];
    return reviews
      .map((review) => {
        if (review && typeof review === "object") {
          const rating = toNumber((review as Record<string, unknown>).rating);
          return rating;
        }
        return null;
      })
      .filter((rating): rating is number => rating !== null);
  });

  const averageRating =
    ratings.length > 0
      ? Number((ratings.reduce((acc, item) => acc + item, 0) / ratings.length).toFixed(1))
      : null;

  return {
    totalListings: getTotalFromResponse(listingsRes),
    activeListings,
    upcomingAvailability,
    averageRating,
  };
};

export const getTouristDashboardStats = async (): Promise<TouristStatShape> => {
  const [userInfo, publicListings] = await Promise.all([
    getUserInfo(),
    getAllListingsPublic("limit=1"),
  ]);

  const bookings = Array.isArray(userInfo?.tourist?.bookings)
    ? userInfo.tourist.bookings
    : [];
  const reviews = Array.isArray(userInfo?.tourist?.reviews)
    ? userInfo.tourist.reviews
    : [];

  const rawPreferences = userInfo?.tourist?.preferences || "";
  const preferenceCount = rawPreferences
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean).length;

  return {
    totalBookings: bookings.length,
    totalReviews: reviews.length,
    availableListings: getTotalFromResponse(publicListings),
    preferenceCount,
  };
};

export const getAdminDashboardCharts = async (): Promise<DashboardChart[]> => {
  const [adminsRes, guidesRes, touristsRes, listingsRes] = await Promise.all([
    getAllAdmins("limit=200"),
    getAllGuides("limit=200"),
    getAllTourists("limit=200"),
    getAllListings("limit=200"),
  ]);

  const admins: IAdmin[] = Array.isArray(adminsRes?.data) ? adminsRes.data : [];
  const guides: IGuide[] = Array.isArray(guidesRes?.data) ? guidesRes.data : [];
  const tourists: ITourist[] = Array.isArray(touristsRes?.data) ? touristsRes.data : [];
  const listings = Array.isArray(listingsRes?.data)
    ? (listingsRes.data as Listing[])
    : [];

  const registrationTrend = countByLastMonths(
    [...admins, ...guides, ...tourists] as DateCarrier[],
    (item) => item.createdAt
  );

  const guideStatusCount = guides.reduce((acc, guide) => {
    const key = guide?.verificationStatus || "UNKNOWN";
    acc.set(key, (acc.get(key) || 0) + 1);
    return acc;
  }, new Map<string, number>());

  return [
    {
      title: "User Growth (6 Months)",
      description: "Admin + Guide + Tourist registrations by month",
      type: "line",
      points: registrationTrend,
    },
    {
      title: "Listings by Category",
      description: "Top categories from current listings",
      type: "bar",
      points: topCategoryPoints(listings),
    },
    {
      title: "Guide Verification Status",
      description: "Distribution of guide verification states",
      type: "bar",
      points: Array.from(guideStatusCount.entries()).map(([label, value]) => ({
        label,
        value,
      })),
    },
  ];
};

export const getGuideDashboardCharts = async (): Promise<DashboardChart[]> => {
  const listingsRes = (await getAllListings("limit=200")) as ApiListResponse<Listing>;
  const listings = Array.isArray(listingsRes?.data) ? listingsRes.data : [];

  const listingCreationTrend = countByLastMonths(listings, (listing) => listing.createdAt);
  const upcomingAvailabilityByMonth = countByLastMonths(
    listings.flatMap((listing) => listing.availabilities || []),
    (slot) => slot.startAt
  );

  return [
    {
      title: "Listings Created (6 Months)",
      description: "New listings over the last six months",
      type: "line",
      points: listingCreationTrend,
    },
    {
      title: "Upcoming Availability",
      description: "Available slots grouped by month",
      type: "line",
      points: upcomingAvailabilityByMonth,
    },
    {
      title: "Category Mix",
      description: "Top categories in your listings",
      type: "bar",
      points: topCategoryPoints(listings),
    },
  ];
};

export const getTouristDashboardCharts = async (): Promise<DashboardChart[]> => {
  const [userInfo, publicListingsRes] = await Promise.all([
    getUserInfo(),
    getAllListingsPublic("limit=200"),
  ]);

  const publicListings = Array.isArray(publicListingsRes?.data)
    ? (publicListingsRes.data as Listing[])
    : [];
  const bookings = Array.isArray(userInfo?.tourist?.bookings)
    ? userInfo.tourist.bookings
    : [];
  const reviews = Array.isArray(userInfo?.tourist?.reviews)
    ? userInfo.tourist.reviews
    : [];

  const bookingReviewTrend = countByLastMonths(
    [...bookings, ...reviews],
    (item) => (item as unknown as { createdAt?: string | Date })?.createdAt
  );

  if (bookingReviewTrend.every((item) => item.value === 0)) {
    bookingReviewTrend[bookingReviewTrend.length - 1].value =
      bookings.length + reviews.length;
  }

  return [
    {
      title: "My Activity (6 Months)",
      description: "Bookings and reviews over time",
      type: "line",
      points: bookingReviewTrend,
    },
    {
      title: "Explore by Category",
      description: "Available listings by category",
      type: "bar",
      points: topCategoryPoints(publicListings),
    },
  ];
};
