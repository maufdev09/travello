import FeatureSection from "@/components/modules/Home/FeatureSection";
import { HeroSection } from "@/components/modules/Home/Hero";
import OurStorySection from "@/components/modules/Home/OurStorySection";
import TrendingDestinations from "@/components/modules/Home/TrendingDestinations";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Travello - Discover Your Next Adventure</title>
        <meta
          name="description"
          content="Plan smarter. Travel better. Explore the world with AI-powered insights."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <main>
        <HeroSection
        backgroundUrl="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
        tagline="Your Journey Begins"
        title="Discover Your Next Adventure"
        subtitle="Plan smarter. Travel better. Explore the world with AI-powered insights."
      />
      <OurStorySection />
      <TrendingDestinations />
      <FeatureSection />
    </main>
    </>
  );
}
