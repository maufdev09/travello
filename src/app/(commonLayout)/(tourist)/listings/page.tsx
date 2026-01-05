import { getAllListingsPublic } from '@/services/listing/listingManagement';
import ListingCard from '@/components/shared/ListingCard';
import { ListingsResponse } from '@/types/ListingType';

const Listingpage = async () => {
  const response: ListingsResponse = await getAllListingsPublic();

  if (!response.success) {
    return <div>Error loading listings</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tour Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {response.data.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default Listingpage;
