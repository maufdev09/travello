"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { deleteAdminByAdmin } from "@/services/admin/adminManagement";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { IAdmin } from "@/types/userInterface";
import { adminColumns } from "./AdminColums";
import AdminFormDialog from "./AdminFormDailog";
import AdminDetailViewDialog from "./AdminDetailViewDailog";

interface AdminTableProps {
  admins: IAdmin[];
}

const AdminTable = ({ admins }: AdminTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingAdmin, setDeletingAdmin] = useState<IAdmin | null>(null);
  const [editingAdmin, setEditingAdmin] = useState<IAdmin | null>(null);
  const [viewingAdmin, setViewingAdmin] = useState<IAdmin | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const refresh = () => {
    startTransition(() => router.refresh());
  };

  const confirmDelete = async () => {
    if (!deletingAdmin) return;

    setIsDeleting(true);
    const result = await deleteAdminByAdmin(deletingAdmin.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Admin deleted successfully");
      setDeletingAdmin(null);
      refresh();
    } else {
      toast.error(result.message || "Failed to delete admin");
    }
  };

  return (
    <>
      {/* Table */}
      <ManagementTable
        data={admins}
        columns={adminColumns}
        getRowKey={(admin) => admin.id!}
        empytyMessage="No admins found"
        onView={(admin) => setViewingAdmin(admin)}
        onEdit={(admin) => setEditingAdmin(admin)}
        onDelete={(admin) => setDeletingAdmin(admin)}
      />

      {/* View Admin */}
      <AdminDetailViewDialog
        open={!!viewingAdmin}
        onClose={() => setViewingAdmin(null)}
        admin={viewingAdmin}
      />

      {/* Edit Admin */}
      <AdminFormDialog
        open={!!editingAdmin}
        admin={editingAdmin}
        onClose={() => setEditingAdmin(null)}
        onSuccess={() => {
          setEditingAdmin(null);
          refresh();
        }}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmationDialog
        open={!!deletingAdmin}
        onOpenChange={(open) => !open && setDeletingAdmin(null)}
        onConfirm={confirmDelete}
        title="Delete Admin"
        description={`Are you sure you want to delete ${deletingAdmin?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AdminTable;
