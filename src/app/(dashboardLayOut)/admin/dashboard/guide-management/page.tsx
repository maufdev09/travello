
import GuideFilter from "@/components/modules/Admin/GuidesManagement/GuideFilter";
import GuidesManagementHeader from "@/components/modules/Admin/GuidesManagement/GuidesManagementHaeder";
import GuidesTable from "@/components/modules/Admin/GuidesManagement/GuidesTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFiilter from "@/components/shared/SearchFiilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllGuides } from "@/services/admin/guideManagement";
import { Suspense } from "react";

const AdminGuidesManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {


  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const guidesResult = await getAllGuides(queryString);
  
  // example: ?searchTerm=John&verificationStatus=APPROVED


  const totalPages = Math.ceil(
    guidesResult?.meta?.total / guidesResult?.meta?.limit
  );

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <GuidesManagementHeader guide={guidesResult.data} />

      {/* Filters */}
    <GuideFilter />

      {/* Table */}
      <Suspense fallback={<TableSkeleton columns={18} rows={10} />}>
        <GuidesTable guides={guidesResult?.data} />

        <TablePagination
          currentPage={guidesResult?.meta?.page}
          totalPages={ totalPages}
        />
      </Suspense>
    </div>
  );
};

export default AdminGuidesManagementPage;
