"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import AdminFormDialog from "./AdminFormDailog";
import { IAdmin } from "@/types/userInterface";

interface AdminManagementHeaderProps {
  admins?: IAdmin[];
}

const AdminManagementHeader = ({ admins }: AdminManagementHeaderProps) => {
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
      {/* Create Admin Dialog */}
      <AdminFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      {/* Page Header */}
      <ManagementPageHeader
        title="Admin Management"
        description="Manage system administrators and their access"
        icon={ShieldCheck}
        meta={[
          {
            label: "Total Admins",
            value: admins?.length ?? 0,
          },
        ]}
        actions={{
          label: "Add Admin",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default AdminManagementHeader;
