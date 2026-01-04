"use client";

import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { useMemo } from "react";

interface ManagementPageLoaderProps {
  columns: number;
  hasActionButton?: boolean;
  filterCount?: number;
  filterWidths?: string[];
}

const ManagementPageLoader = ({
  columns,
  hasActionButton = false,
  filterCount = 0,
  filterWidths = [],
}: ManagementPageLoaderProps) => {
  const filterElements = useMemo(() => {
    if (filterCount === 0) return null;

    return (
      <div className="flex flex-wrap items-center gap-3">
        {Array.from({ length: filterCount }).map((_, index) => (
          <div
            key={index}
            className={`h-10 ${
              filterWidths[index] || "w-40"
            } rounded-md border border-muted bg-gradient-to-r from-muted via-muted/70 to-muted animate-pulse shadow-sm`}
          />
        ))}
      </div>
    );
  }, [filterCount, filterWidths]);

  return (
    <div className="space-y-6">
      {/* ===== Header Skeleton ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded-md bg-gradient-to-r from-muted via-muted/70 to-muted animate-pulse" />
          <div className="h-4 w-96 max-w-full rounded-md bg-muted/70 animate-pulse" />
        </div>

        {hasActionButton && (
          <div className="h-10 w-32 rounded-md bg-primary/20 animate-pulse shadow-sm" />
        )}
      </div>

      {/* ===== Filters Skeleton ===== */}
      {filterElements}

      {/* ===== Table Skeleton ===== */}
      <div className="rounded-lg border border-muted/60 overflow-hidden">
        <TableSkeleton columns={columns} rows={10} />
      </div>
    </div>
  );
};

export default ManagementPageLoader;
