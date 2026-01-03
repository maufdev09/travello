"use client";

import { Loader2, RefreshCcw } from "lucide-react";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface RefreshButtonProps {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
  showLabel?: boolean;
}

function RefreshButton({
  size = "default",
  variant = "default",
  showLabel = true,
}: RefreshButtonProps) {
  const router = useRouter();

  const [isPending, startTransition] =useTransition()
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleRefresh}
      disabled={isPending}
    >
      <RefreshCcw
        className={`h-4 w-4 ${isPending ? "animate-spin" : ""} ${
          showLabel ? "mr-2" : ""
        }`}
      />
      {showLabel && "Refresh"}
    </Button>
  );
}

export default RefreshButton;
