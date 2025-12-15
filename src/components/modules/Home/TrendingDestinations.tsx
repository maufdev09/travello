

import DestinationCard from "@/components/shared/DestinationCard";
import { Button } from "@/components/ui/button";
import { Destination } from "@/types/DestinationType";
import imgImage from "../../../asset/images/ourStory1.jpg";
import imgImage1 from "../../../asset/images/ourStory2.jpg";
import imgImage2 from "../../../asset/images/ourStory3.jpg";
import imgImage3 from "../../../asset/images/ourStory4.jpg";


const destinations: Destination[] = [
  {
    location: "Greece",
    title: "Santorini Sunset",
    description: "Experience the world-famous sunsets of Oia, where white-washed buildings meet the deep blue Aegean Sea. Indulge in local wines and ancient history.",
    price: "From $1,299",
    image:  imgImage,
  },
  {
    location: "Japan",
    title: "Kyoto Gardens",
    description: "Wander through bamboo groves and ancient temples. Witness the delicate beauty of cherry blossoms and experience a traditional tea ceremony.",
    price: "From $1,850",
    image:  imgImage1,
  },
  {
    location: "Morocco",
    title: "Sahara Expedition",
    description: "Sleep under a blanket of stars in the vast Sahara desert. Ride camels across golden dunes and discover the magic of Berber culture.",
    price: "From $950",
    image:  imgImage2,
  },
  {
    location: "Italy",
    title: "Amalfi Coast",
    description: "Drive the dramatic coastline roads, taste the freshest limoncello, and swim in crystal clear waters in this Italian paradise.",
    price: "From $1,450",
    image:  imgImage3,
  },

  
];




export default function TrendingDestinations() {
  return (
    <section className="w-full py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 space-y-3 md:space-y-4">
          <h2 className="text-[#1a4d6f] text-3xl md:text-4xl lg:text-5xl">
            Trending Destinations
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            Hand-picked locations that are capturing hearts this season.
          </p>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {destinations.map((destination, index) => (
            <DestinationCard key={index} destination={destination} />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="flex justify-center">
          <Button 
            size="lg"
            className="bg-[#1a4d6f] hover:bg-[#1a4d6f]/90 text-white rounded-full px-8 shadow-lg"
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
}