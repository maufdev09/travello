"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus, Map } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ListingFormDialog from "./ListingFormDailog";

interface ListingManagementHeaderProps {
  total: number;
}

const ListingManagementHeader = ({
  total,
  
}: ListingManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const onSuccess = () => {
    startTransition(() => router.refresh());
    setOpen(false);
  };

  return (
    <>
      <ListingFormDialog  open={open} onClose={() => setOpen(false)} onSuccess={onSuccess} />

      <ManagementPageHeader
        title="Listing Management"
        description="Manage your tour listings"
        icon={Map}
        meta={[
          {
            label: "Total Listings",
            value: total,
          },
        ]}
        actions={{
          label: "Create Listing",
          icon: Plus,
          onClick: () => setOpen(true),
        }}
      />
    </>
  );
};

export default ListingManagementHeader;
