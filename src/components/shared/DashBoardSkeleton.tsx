"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* ===== Header Skeleton ===== */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-72 bg-gradient-to-r from-muted via-muted/60 to-muted" />
        <Skeleton className="h-4 w-[420px] bg-muted/70" />
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card
            key={i}
            className="relative overflow-hidden border-muted/60"
          >
            {/* subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-5 rounded-full bg-primary/30" />
            </CardHeader>

            <CardContent>
              <Skeleton className="h-9 w-24 mb-3 bg-primary/40" />
              <Skeleton className="h-3 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ===== Charts Section ===== */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="col-span-4 border-muted/60">
          <CardHeader>
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent className="pl-2">
            <Skeleton className="h-[340px] w-full rounded-lg bg-gradient-to-b from-muted/80 to-muted/40" />
          </CardContent>
        </Card>

        {/* Side List / Activity */}
        <Card className="col-span-3 border-muted/60">
          <CardHeader>
            <Skeleton className="h-5 w-36" />
          </CardHeader>
          <CardContent className="space-y-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-11 w-11 rounded-full bg-primary/30" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
