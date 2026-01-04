import AdminFilter from "@/components/modules/Admin/AdminManagement/AdminFilter";
import AdminManagementHeader from "@/components/modules/Admin/AdminManagement/AdminManagementHeader";
import AdminTable from "@/components/modules/Admin/AdminManagement/AdminTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllAdmins } from "@/services/admin/adminManagement";
import { Suspense } from "react";

const AdminManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // 1️⃣ Query handling
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  // 2️⃣ Data fetch
  const adminsResult = await getAllAdmins(queryString);

  // 3️⃣ Pagination
  const totalPages = Math.ceil(
    (adminsResult?.meta?.total || 0) /
      (adminsResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminManagementHeader admins={adminsResult?.data || []} />

      {/* Filters */}
      <AdminFilter />

      {/* Table + Pagination */}
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <AdminTable admins={adminsResult?.data || []} />

        <TablePagination
          currentPage={adminsResult?.meta?.page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default AdminManagementPage;
