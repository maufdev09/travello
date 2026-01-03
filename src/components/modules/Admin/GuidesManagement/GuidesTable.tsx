"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { deleteGuide } from "@/services/admin/guideManagement";
import { IGuide } from "@/types/userInterface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import GuidesFormDaialog from "./GuidesFormDaialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { guidesColumns } from "./GuidesColums";

interface GuidesTableProps {
  guides: IGuide[];
}

const GuidesTable = ({ guides }: GuidesTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingGuide, setDeletingGuide] = useState<IGuide | null>(null);
//   const [viewingGuide, setViewingGuide] = useState<IGuide | null>(null);
  const [editingGuide, setEditingGuide] = useState<IGuide | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  // const handleView = (guide: IGuide) => {
  //   setViewingGuide(guide);
  // };

  const handleEdit = (guide: IGuide) => {
    setEditingGuide(guide);
  };

  const handleDelete = (guide: IGuide) => {
    setDeletingGuide(guide);
  };

  const confirmDelete = async () => {
    if (!deletingGuide) return;

    setIsDeleting(true);
    const result = await deleteGuide(deletingGuide.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Guide deleted successfully");
      setDeletingGuide(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete guide");
    }
  };

  return (
    <>
      {/* Main Table */}
      <ManagementTable
        data={guides}
        columns={guidesColumns}
        onView={() => {}}
        onEdit={() => {}}
        onDelete={handleDelete}
        getRowKey={(guide) => guide.id!}
        empytyMessage="No guides found"
      />

      {/* Edit Guide Dialog */}
       <GuidesFormDaialog
        open={!!editingGuide}
        onclose={() => setEditingGuide(null)}
        guide={editingGuide!}
        onSuccess={() => {
          setEditingGuide(null);
          handleRefresh();
        }}
      /> 

      {/* View Guide Detail Dialog */}
       {/* <GuideViewDetailDialog
        open={!!viewingGuide}
        onClose={() => setViewingGuide(null)}
        guide={viewingGuide}
      />  */}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingGuide}
        onOpenChange={(open) => !open && setDeletingGuide(null)}
        onConfirm={confirmDelete}
        title="Delete Guide"
        description={`Are you sure you want to delete ${deletingGuide?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default GuidesTable;
