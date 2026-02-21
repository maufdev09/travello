"use client";

import { useRouter } from "next/navigation";
import { AISearchBar } from "./AiSearchBar";

interface AiListingSearchClientProps {
  initialQuery?: string;
}

export default function AiListingSearchClient({ initialQuery }: AiListingSearchClientProps) {
  const router = useRouter();

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/ai-listings?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <AISearchBar
      placeholder="Tell AI what kind of trip you want..."
      onSearch={handleSearch}
      initialValue={initialQuery}
    />
  );
}
