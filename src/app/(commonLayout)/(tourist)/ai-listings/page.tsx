import ListingCard from "@/components/shared/ListingCard";
import AiListingSearchClient from "@/components/shared/AiListingSearchClient";
import { getListingSuggestion } from "@/services/listing/listingManagement";
import { Listing } from "@/types/ListingType";

interface AiListingsPageProps {
  searchParams?: Promise<{ q?: string }>;
}

const normalizeSuggestionData = (payload: unknown): Listing[] => {
  if (!payload) return [];

  if (Array.isArray(payload)) return payload as Listing[];

  if (typeof payload === "object" && payload !== null) {
    const obj = payload as Record<string, unknown>;

    if (Array.isArray(obj.data)) return obj.data as Listing[];
    if (Array.isArray(obj.listings)) return obj.listings as Listing[];
    if (Array.isArray(obj.results)) return obj.results as Listing[];
  }

  return [];
};

const AiListingpage = async ({ searchParams }: AiListingsPageProps) => {
  const params = (await searchParams) || {};
  const query = params.q?.trim() || "";

  let suggestions: Listing[] = [];
  let errorMessage = "";

  if (query) {
    const response = await getListingSuggestion(query);

    if (response?.success === false) {
      errorMessage = response.message || "Failed to get suggestions";
    } else {
      suggestions = normalizeSuggestionData(response?.data ?? response);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">AI Tour Suggestions</h1>
      <p className="mt-2 text-muted-foreground">
        Describe your ideal trip and get the most relevant tours.
      </p>

      <div className="mt-6">
        <AiListingSearchClient initialQuery={query} />
      </div>

      {!query ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Start by typing a travel idea above.
        </p>
      ) : null}

      {errorMessage ? <p className="mt-8 text-sm text-red-600">{errorMessage}</p> : null}

      {query && !errorMessage && suggestions.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          No matching tours found. Try a different description.
        </p>
      ) : null}

      {suggestions.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default AiListingpage;
