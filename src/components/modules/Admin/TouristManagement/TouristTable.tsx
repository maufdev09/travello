"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { ITourist } from "@/types/userInterface";
import TouristFormDialog from "./TouristFormDailog";
import TouristDetailViewDialog from "./TouristDetailViewDailog";
import { deleteTouristByAdmin } from "@/services/admin/touristManagement";
import { touristColumns } from "./TouristColumn";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */
interface TouristTableProps {
  tourists: ITourist[];
}

/* -------------------------------------------------------------------------- */
/*                              COMPONENT                                     */
/* -------------------------------------------------------------------------- */
const TouristTable = ({ tourists }: TouristTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingTourist, setDeletingTourist] =
    useState<ITourist | null>(null);
  const [editingTourist, setEditingTourist] =
    useState<ITourist | null>(null);
  const [viewingTourist, setViewingTourist] =
    useState<ITourist | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const refresh = () => {
    startTransition(() => router.refresh());
  };

  /* ------------------------------------------------------------------------ */
  /*                                DELETE                                    */
  /* ------------------------------------------------------------------------ */
  const confirmDelete = async () => {
    if (!deletingTourist) return;

    setIsDeleting(true);
    const result = await deleteTouristByAdmin(deletingTourist.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Tourist deleted successfully");
      setDeletingTourist(null);
      refresh();
    } else {
      toast.error(result.message || "Failed to delete tourist");
    }
  };

  return (
    <>
      {/* ================= TABLE ================= */}
      <ManagementTable
        data={tourists}
        columns={touristColumns}
        getRowKey={(tourist) => tourist.id!}
        empytyMessage="No tourists found"
        onView={(tourist) => setViewingTourist(tourist)}
        onEdit={(tourist) => setEditingTourist(tourist)}
        onDelete={(tourist) => setDeletingTourist(tourist)}
      />

      {/* ================= VIEW ================= */}
      <TouristDetailViewDialog
        open={!!viewingTourist}
        onClose={() => setViewingTourist(null)}
        tourist={viewingTourist}
      />

      {/* ================= EDIT ================= */}
      <TouristFormDialog
        open={!!editingTourist}
        tourist={editingTourist}
        onClose={() => setEditingTourist(null)}
        onSuccess={() => {
          setEditingTourist(null);
          refresh();
        }}
      />

      {/* ================= DELETE ================= */}
      <DeleteConfirmationDialog
        open={!!deletingTourist}
        onOpenChange={(open) => !open && setDeletingTourist(null)}
        onConfirm={confirmDelete}
        title="Delete Tourist"
        description={`Are you sure you want to delete ${deletingTourist?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default TouristTable;
