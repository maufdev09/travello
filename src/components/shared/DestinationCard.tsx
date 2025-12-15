
"use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { ArrowRight, LocationEditIcon } from "lucide-react";
import { Destination } from "@/types/DestinationType";



function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border-0 aspect-[468/500] bg-gray-900">
      {/* Background Image */}
      {destination.image && (
        <Image
          src={destination.image}
          
          alt={destination.title}
          className="absolute inset-0 w-full h-full object-cover"

        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <CardContent className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="space-y-3 md:space-y-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-[#E8D5C4]">
            <LocationEditIcon />
            <span className="text-xs md:text-sm">{destination.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-white text-2xl md:text-3xl">
            {destination.title}
          </h3>

          {/* Description */}
          <p className="text-gray-200 text-sm md:text-base line-clamp-3">
            {destination.description}
          </p>

          {/* Price & Explore */}
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <span className="text-[#E8D5C4] text-base md:text-lg">
              {destination.price}
            </span>

            <button className="flex items-center gap-2 text-white text-xs md:text-sm hover:gap-3 transition-all">
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DestinationCard;
