import TouristFilter from "@/components/modules/Admin/TouristManagement/TouristFilter";
import TouristManagementHeader from "@/components/modules/Admin/TouristManagement/TouristManagementHeader";
import TouristTable from "@/components/modules/Admin/TouristManagement/TouristTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllTourists } from "@/services/admin/touristManagement";
import { Suspense } from "react";

const AdminTouristManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  /* -------------------------------------------------------------------------- */
  /*                              QUERY HANDLING                                 */
  /* -------------------------------------------------------------------------- */
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  /* -------------------------------------------------------------------------- */
  /*                                DATA FETCH                                   */
  /* -------------------------------------------------------------------------- */
  const touristsResult = await getAllTourists(queryString);

  /* -------------------------------------------------------------------------- */
  /*                               PAGINATION                                    */
  /* -------------------------------------------------------------------------- */
  const totalPages = Math.ceil(
    (touristsResult?.meta?.total || 0) /
      (touristsResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <TouristManagementHeader tourists={touristsResult?.data || []} />

      {/* Filters */}
      <TouristFilter />

      {/* Table + Pagination */}
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <TouristTable tourists={touristsResult?.data || []} />

        <TablePagination
          currentPage={touristsResult?.meta?.page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default AdminTouristManagementPage;
