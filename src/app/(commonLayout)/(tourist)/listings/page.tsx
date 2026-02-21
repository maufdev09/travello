import ListingCard from "@/components/shared/ListingCard";
import PublicListingFilter from "@/components/shared/PublicListingFilter";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllListingsPublic } from "@/services/listing/listingManagement";
import { Listing, ListingsResponse } from "@/types/ListingType";

interface ListingPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const getSingleParam = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value || "";
};

const normalizeCategory = (category: string): string => {
  const upper = category.trim().toUpperCase();

  // Handle common typo from UI/manual URL edits.
  if (upper === "HESTORICAL") {
    return "HISTORICAL";
  }

  return upper;
};

const applyLocalFilters = (
  listings: Listing[],
  params: { [key: string]: string | string[] | undefined }
) => {
  const searchTerm = getSingleParam(params.searchTerm).trim().toLowerCase();
  const city = getSingleParam(params.city).trim().toLowerCase();
  const category = normalizeCategory(getSingleParam(params.category));

  return listings.filter((listing) => {
    const matchesSearch =
      !searchTerm ||
      listing.title.toLowerCase().includes(searchTerm) ||
      listing.description.toLowerCase().includes(searchTerm) ||
      listing.city.toLowerCase().includes(searchTerm) ||
      listing.category.toLowerCase().includes(searchTerm);

    const matchesCity = !city || listing.city.toLowerCase().includes(city);

    const matchesCategory = !category || listing.category.toUpperCase() === category;

    return matchesSearch && matchesCity && matchesCategory;
  });
};

const Listingpage = async ({ searchParams }: ListingPageProps) => {
  const searchParamsObj = (await searchParams) || {};

  const apiSearchParams = { ...searchParamsObj };
  delete apiSearchParams.category;

  const queryString = queryStringFormatter(apiSearchParams);

  let response: ListingsResponse = await getAllListingsPublic(queryString);

  // If backend rejects filtered query, fallback to unfiltered public listings.
  if (!response?.success) {
    response = await getAllListingsPublic();
  }

  if (!response?.success) {
    return <div>Error loading listings</div>;
  }

  const filteredListings = applyLocalFilters(response.data || [], searchParamsObj);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Tour Listings</h1>
      <p className="mb-6 text-muted-foreground">
        Search tours and filter by city or category.
      </p>

      <PublicListingFilter />

      {filteredListings.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          No listings found for the selected filters.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Listingpage;
