"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { listingColumns } from "./ListingColumns";
import { deleteListing } from "@/services/listing/listingManagement";
import ListingFormDialog from "./ListingFormDailog";

const ListingTable = ({ listings }: { listings: any[] }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<any | null>(null);
  const [deleting, setDeleting] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = () => startTransition(() => router.refresh());

  const confirmDelete = async () => {
    if (!deleting) return;

    setLoading(true);
    const res = await deleteListing(deleting.id);
    setLoading(false);

    if (res.success) {
      toast.success(res.message);
      setDeleting(null);
      refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <ManagementTable
        data={listings}
        columns={listingColumns}
        getRowKey={(row) => row.id}
        empytyMessage="No listings found"
        onEdit={(row) => setEditing(row)}
        onDelete={(row) => setDeleting(row)}
      />

      <ListingFormDialog
        open={!!editing}
        listing={editing}
        onClose={() => setEditing(null)}
        onSuccess={() => {
          setEditing(null);
          refresh();
        }}
      />

      <DeleteConfirmationDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        onConfirm={confirmDelete}
        isDeleting={loading}
        title="Delete Listing"
        description={`Delete "${deleting?.title}"?`}
      />
    </>
  );
};

export default ListingTable;
