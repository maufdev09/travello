import FeatureCard from '@/components/shared/FeatureCard';
import { Camera, Compass, Map } from 'lucide-react';
import React from 'react'

function FeatureSection() {
 const features=   [{
      icon: Compass,
      title: "Curated Itineraries",
      description: "Hand-picked experiences tailored to your unique travel style and preferences."
    },
    {
      icon: Camera,
      title: "Photo-First Discovery",
      description: "Explore destinations through immersive photography before you book."
    },
    {
      icon: Map,
      title: "Local Guides",
      description: "Connect with expert locals who know the hidden gems off the beaten path."
    }
  ];

  return (
    <div className="min-h-screen bg-[rgba(232,213,196,0.1)] flex items-center justify-center p-6">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeatureSection
