"use client";

import RefreshButton from "@/components/shared/RefreshButton";
import SearchFiilter from "@/components/shared/SearchFiilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectFilter from "@/components/shared/SelectFilter";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const categoryOptions = [
  { label: "Historical", value: "HISTORICAL" },
  { label: "Adventure", value: "ADVENTURE" },
  { label: "Cultural", value: "CULTURAL" },
  { label: "Nature", value: "NATURE" },
  { label: "Food", value: "FOOD" },
  { label: "Custom", value: "CUSTOM" },
];

const PublicListingFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [city, setCity] = useState(searchParams.get("city") || "");
  const debouncedCity = useDebounce(city, 500);

  useEffect(() => {
    const currentCity = searchParams.get("city") || "";

    if (debouncedCity === currentCity) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedCity) {
      params.set("city", debouncedCity);
    } else {
      params.delete("city");
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [debouncedCity, pathname, router, searchParams]);

  const hasCityFilter = city.trim().length > 0;

  const clearCityFilter = () => {
    setCity("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("city");
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-[240px] flex-1">
          <SearchFiilter
            paramName="searchTerm"
            placeholder="Search listings by title or keyword..."
          />
        </div>
        <div className="w-[180px]">
          <SelectFilter
            paramName="category"
            placeholder="Category"
            defaultValue="All"
            options={categoryOptions}
          />
        </div>
        <RefreshButton />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Filter by city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full sm:w-[260px]"
          disabled={isPending}
        />

        {hasCityFilter ? (
          <Button variant="ghost" onClick={clearCityFilter} disabled={isPending}>
            Clear city
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default PublicListingFilter;
