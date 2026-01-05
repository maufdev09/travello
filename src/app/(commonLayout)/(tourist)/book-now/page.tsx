import { getAllListingsPublic } from '@/services/listing/listingManagement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Listing } from '@/types/ListingType';
import { notFound } from 'next/navigation';
import PaymentButton from '@/components/shared/PaymentButton';
import Image from 'next/image';

interface BookNowPageProps {
  searchParams: { id: string };
}

const BookNowPage = async ({ searchParams }: BookNowPageProps) => {
  const { id } = searchParams;

  if (!id) {
    notFound();
  }

  // Fetch all listings and find the one with the id
  // In a real app, you'd have a getListingById function
  const response = await getAllListingsPublic();
  const listing = response.data.find((l: Listing) => l.id === id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Book Your Tour</h1>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="aspect-video w-full overflow-hidden rounded-t-lg relative">
              <Image
                src={listing.images}
                alt={listing.title}
                fill
                className="object-cover"
              />
            </div>
            <CardTitle className="text-2xl">{listing.title}</CardTitle>
            <CardDescription>{listing.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{listing.category}</Badge>
                <span className="text-sm text-muted-foreground">{listing.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{listing.currency} {listing.price}</span>
                <span className="text-sm text-muted-foreground">{listing.durationHours} hours</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Max Group Size:</strong> {listing.maxGroupSize}
                </div>
                <div>
                  <strong>Meeting Point:</strong> {listing.meetingPoint}
                </div>
                <div>
                  <strong>Guide:</strong> {listing.guide.name}
                </div>
                <div>
                  <strong>Currency:</strong> {listing.currency}
                </div>
              </div>
              <div>
                <strong>Itinerary:</strong>
                <p className="mt-2">{listing.itinerary}</p>
              </div>
            </div>
          </CardContent>
          <div className="p-6">
            <PaymentButton />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookNowPage;