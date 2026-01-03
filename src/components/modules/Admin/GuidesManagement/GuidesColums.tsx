"use client";


import { DateCell } from "@/components/shared/cell/Datecell";
import { StatusBadgeCell } from "@/components/shared/cell/statusBadgecell";
import { UserInfoCell } from "@/components/shared/cell/userInfocell";
import { Column } from "@/components/shared/ManagementTable";
import { IGuide } from "@/types/userInterface";
import { BadgeCheck, Clock } from "lucide-react";

export const guidesColumns: Column<IGuide>[] = [
  {
    header: "Guide",
    accessor: (guide) => (
      <UserInfoCell
        name={guide.name}
        email={guide.email}
        photo={guide.profilePhoto}
      />
    ),
  },
  {
    header: "Languages",
    accessor: (guide) => (
      <div className="flex flex-wrap gap-1">
        {guide.languages && guide.languages.length > 0 ? (
          guide.languages.map((lang, index) => (
            <span
              key={`${lang}-${index}`}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {lang}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-500">No languages</span>
        )}
      </div>
    ),
  },
  {
    header: "Expertise",
    accessor: (guide) => (
      <div className="flex flex-wrap gap-1">
        {guide.expertise && guide.expertise.length > 0 ? (
          guide.expertise.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-500">No expertise</span>
        )}
      </div>
    ),
  },
  {
    header: "Contact",
    accessor: (guide) => (
      <div className="flex flex-col">
        <span className="text-sm">{guide.contactNumber || "N/A"}</span>
      </div>
    ),
  },
  {
    header: "Daily Rate",
    accessor: (guide) => (
      <span className="text-sm font-semibold text-green-600">
        {guide.dailyRate ? `৳${guide.dailyRate}` : "N/A"}
      </span>
    ),
  },
  {
    header: "Verification",
    accessor: (guide) => (
      <div className="flex items-center gap-1">
        {guide.verificationStatus === "APPROVED" ? (
          <BadgeCheck className="h-4 w-4 text-green-600" />
        ) : (
          <Clock className="h-4 w-4 text-yellow-600" />
        )}
        <span className="text-sm capitalize">
          {guide.verificationStatus.toLowerCase()}
        </span>
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (guide) => <StatusBadgeCell isDeleted={guide.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (guide) => <DateCell date={guide.createdAt} />,
  },
];
