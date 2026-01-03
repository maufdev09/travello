"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import GuidesFormDaialog from "./GuidesFormDaialog";
import { useState, useTransition } from "react";
import { IGuide } from "@/types/userInterface";

interface GuidesManagementHeaderProps {
  guide?: IGuide;
}

const GuidesManagementHeader = ({ guide }: GuidesManagementHeaderProps) => {
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
      <GuidesFormDaialog
        open={isDialogOpen}
        onclose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
        // guide={guide}
      />

      <ManagementPageHeader
        title="Guides Management"
        description="Manage guides information and details"
        actions={{
          label: "Add Guide",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default GuidesManagementHeader;
