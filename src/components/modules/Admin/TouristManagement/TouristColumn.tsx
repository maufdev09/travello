"use client";

import { DateCell } from "@/components/shared/cell/Datecell";
import { StatusBadgeCell } from "@/components/shared/cell/statusBadgecell";
import { UserInfoCell } from "@/components/shared/cell/userInfocell";
import { Column } from "@/components/shared/ManagementTable";
import { MapPin, User } from "lucide-react";
import { ITourist } from "@/types/userInterface";

/* -------------------------------------------------------------------------- */
/*                                TABLE COLUMNS                               */
/* -------------------------------------------------------------------------- */
export const touristColumns: Column<ITourist>[] = [
  {
    header: "Tourist",
    accessor: (tourist) => (
      <UserInfoCell
        name={tourist.name}
        email={tourist.email}
        photo={tourist.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact",
    accessor: (tourist) => (
      <span className="text-sm">
        {tourist.contactNumber || "N/A"}
      </span>
    ),
  },
  {
    header: "Preferences",
    accessor: (tourist) => (
      <span className="text-sm text-muted-foreground">
        {tourist.preferences || "Not specified"}
      </span>
    ),
  },
  {
    header: "Role",
    accessor: () => (
      <div className="flex items-center gap-1 text-primary">
        <User className="h-4 w-4" />
        <span className="text-sm font-medium">Tourist</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (tourist) => (
      <StatusBadgeCell isDeleted={tourist.isDeleted} />
    ),
    sortKey: "isDeleted",
  },
  {
    header: "Joined",
    accessor: (tourist) => (
      <DateCell date={tourist.createdAt} />
    ),
    sortKey: "createdAt",
  },
];
