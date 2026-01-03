

import GuidesManagementHeader from "@/components/modules/Admin/GuidesManagement/GuidesManagementHaeder";
import GuidesTable from "@/components/modules/Admin/GuidesManagement/GuidesTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFiilter from "@/components/shared/SearchFiilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllGuides } from "@/services/admin/guideManagement";
import { Suspense } from "react";

const AdminGuidesManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {


  const searchParamsObj = await searchParams;
  const guidesResult = await getAllGuides();

  // const queryString = queryStringFormatter(searchParamsObj);
  // example: ?searchTerm=John&verificationStatus=APPROVED


  const totalPages = Math.ceil(
    guidesResult?.meta?.total / guidesResult?.meta?.limit
  );

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <GuidesManagementHeader guide={guidesResult.data} />

      {/* Filters */}
      <div className="flex items-center gap-4">

        <SearchFiilter
          paramName="searchTerm"
          placeholder="Search guides..."
        />

        <SelectFilter
          paramName="verificationStatus"
          placeholder="Filter by status"
          options={[
            { label: "Pending", value: "PENDING" },
            { label: "Approved", value: "APPROVED" },
            { label: "Rejected", value: "REJECTED" },
          ]}
        />
        

        <RefreshButton />
      </div>

      {/* Table */}
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <GuidesTable guides={guidesResult?.data} />

        <TablePagination
          currentPage={guidesResult?.meta?.page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default AdminGuidesManagementPage;
