'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Listing } from '@/types/ListingType';
import Image from 'next/image';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const router = useRouter();

  const handleBookNow = () => {
    router.push(`/book-now?id=${listing.id}`);
  };
  

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="aspect-video w-full overflow-hidden rounded-t-lg relative">
          <Image
            src={listing.images}
            alt={listing.title}
            fill
            className="object-cover"
          />
        </div>
        <CardTitle className="text-lg">{listing.title}</CardTitle>
        <CardDescription className="line-clamp-2">{listing.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{listing.category}</Badge>
            <span className="text-sm text-muted-foreground">{listing.city}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{listing.currency} {listing.price}</span>
            <span className="text-sm text-muted-foreground">{listing.durationHours} hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Max group: {listing.maxGroupSize}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Guide: {listing.guide.name}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleBookNow} className="w-full">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}