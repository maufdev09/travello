"use client";

import { DateCell } from "@/components/shared/cell/Datecell";
import { StatusBadgeCell } from "@/components/shared/cell/statusBadgecell";
import { UserInfoCell } from "@/components/shared/cell/userInfocell";
import { Column } from "@/components/shared/ManagementTable";
import { ShieldCheck, ShieldAlert } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                                TABLE COLUMNS                               */
/* -------------------------------------------------------------------------- */
export const adminColumns: Column<IAdmin>[] = [
  {
    header: "Admin",
    accessor: (admin) => (
      <UserInfoCell
        name={admin.name}
        email={admin.email}
        photo={admin.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact",
    accessor: (admin) => (
      <span className="text-sm">
        {admin.contactNumber || "N/A"}
      </span>
    ),
  },
  {
    header: "Role",
    accessor: () => (
      <div className="flex items-center gap-1 text-primary">
        <ShieldCheck className="h-4 w-4" />
        <span className="text-sm font-medium">Admin</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (admin) => (
      <StatusBadgeCell isDeleted={admin.isDeleted} />
    ),
    sortKey: "isDeleted",
  },
  {
    header: "Joined",
    accessor: (admin) => (
      <DateCell date={admin.createdAt} />
    ),
    sortKey: "createdAt",
  },
];
