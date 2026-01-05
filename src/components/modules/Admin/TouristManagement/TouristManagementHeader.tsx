"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import TouristFormDialog from "./TouristFormDailog";
import { ITourist } from "@/types/userInterface";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */
interface TouristManagementHeaderProps {
  tourists?: ITourist[];
}

/* -------------------------------------------------------------------------- */
/*                              COMPONENT                                     */
/* -------------------------------------------------------------------------- */
const TouristManagementHeader = ({
  tourists,
}: TouristManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {/* Create Tourist Dialog */}
      <TouristFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      {/* Page Header */}
      <ManagementPageHeader
        title="Tourist Management"
        description="Manage tourists, their profiles and access"
        icon={Users}
        meta={[
          {
            label: "Total Tourists",
            value: tourists?.length ?? 0,
          },
        ]}
        actions={{
          label: "Add Tourist",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default TouristManagementHeader;
