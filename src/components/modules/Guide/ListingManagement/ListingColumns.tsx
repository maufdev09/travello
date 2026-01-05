"use client";

import { Column } from "@/components/shared/ManagementTable";
import { DateCell } from "@/components/shared/cell/Datecell";
import { Badge } from "@/components/ui/badge";

export const listingColumns: Column<any>[] = [
  {
    header: "Title",
    accessor: (listing) => listing.title,
    sortKey: "title",
  },
  {
    header: "City",
    accessor: (listing) => listing.city,
  },
  {
    header: "Price",
    accessor: (listing) => (
      <span>
        {listing.price} {listing.currency}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (listing) => (
      <Badge variant={listing.isActive ? "default" : "destructive"}>
        {listing.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    header: "Created",
    accessor: (listing) => <DateCell date={listing.createdAt} />,
    sortKey: "createdAt",
  },
];
