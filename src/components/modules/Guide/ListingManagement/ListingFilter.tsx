"use client";

import RefreshButton from "@/components/shared/RefreshButton";
import SearchFiilter from "@/components/shared/SearchFiilter";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const ListingFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [city, setCity] = useState(searchParams.get("city") || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    city ? params.set("city", city) : params.delete("city");
    params.set("page", "1");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [city]);

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <SearchFiilter paramName="searchTerm" placeholder="Search listings..." />
        <RefreshButton />
      </div>

      <Input
        placeholder="Filter by city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-[200px]"
      />
    </div>
  );
};

export default ListingFilter;
