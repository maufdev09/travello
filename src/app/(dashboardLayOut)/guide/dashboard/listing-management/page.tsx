import ListingFilter from "@/components/modules/Guide/ListingManagement/ListingFilter";
import ListingManagementHeader from "@/components/modules/Guide/ListingManagement/ListingManagementHeader";
import ListingTable from "@/components/modules/Guide/ListingManagement/ListingTable";
import TablePagination from "@/components/shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getAllListings } from "@/services/listing/listingManagement";


const ListingManagementPage = async ({ searchParams }: any) => {

   const searchParamsObj = await searchParams;
   const queryString = queryStringFormatter(searchParamsObj);
  const result = await getAllListings(queryString);

  const totalPages = Math.ceil(
    (result?.meta?.total || 0) / (result?.meta?.limit || 1)
  );


  return (
    <div className="space-y-6">
      <ListingManagementHeader total={result?.meta?.total || 0} />
      <ListingFilter />
      <ListingTable listings={result?.data || []} />
      <TablePagination
        currentPage={result?.meta?.page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ListingManagementPage;
