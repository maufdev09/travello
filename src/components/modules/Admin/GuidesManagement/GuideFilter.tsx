"use client";

import RefreshButton from "@/components/shared/RefreshButton";
import SearchFiilter from "@/components/shared/SearchFiilter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const GuideFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local states synced with URL
  const [verificationStatus, setVerificationStatus] = useState(
    searchParams.get("verificationStatus") || ""
  );
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [contactNumber, setContactNumber] = useState(
    searchParams.get("contactNumber") || ""
  );

  const debouncedEmail = useDebounce(email, 500);
  const debouncedContactNumber = useDebounce(contactNumber, 500);

  // 🔁 Sync filters → URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (verificationStatus) {
      params.set("verificationStatus", verificationStatus);
    } else {
      params.delete("verificationStatus");
    }

    if (debouncedEmail) {
      params.set("email", debouncedEmail);
    } else {
      params.delete("email");
    }

    if (debouncedContactNumber) {
      params.set("contactNumber", debouncedContactNumber);
    } else {
      params.delete("contactNumber");
    }

    // reset pagination
    params.set("page", "1");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationStatus, debouncedEmail, debouncedContactNumber]);

  const clearAllFilters = () => {
    setVerificationStatus("");
    setEmail("");
    setContactNumber("");

    startTransition(() => {
      router.replace(pathname);
    });
  };

  const activeFiltersCount =
    (verificationStatus ? 1 : 0) +
    (email ? 1 : 0) +
    (contactNumber ? 1 : 0);

  return (
    <div className="space-y-3">
      {/* Row 1: Search + Refresh */}
      <div className="flex items-center gap-3">
        <SearchFiilter
          paramName="searchTerm"
          placeholder="Search guides..."
        />
        <RefreshButton />
      </div>

      {/* Row 2: Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Verification Status */}
        <Select
          value={verificationStatus}
          onValueChange={(value) =>
            setVerificationStatus(value === "all" ? "" : value)
          }
          disabled={isPending}
        >
          <SelectTrigger className="w-[180px] h-10">
            <SelectValue placeholder="Verification Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {/* Email */}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[220px] h-10"
          disabled={isPending}
        />

        {/* Contact Number */}
        <Input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="w-[180px] h-10"
          disabled={isPending}
        />

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            disabled={isPending}
            className="h-10 px-3"
          >
            <X className="h-4 w-4 mr-1" />
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Row 3: Active Filters Badges */}
      {activeFiltersCount > 0 && (
        <div className="min-h-8 flex items-center">
          <div className="flex flex-wrap gap-2">
            {verificationStatus && (
              <Badge variant="outline">
                Status: {verificationStatus}
              </Badge>
            )}
            {email && <Badge variant="outline">Email</Badge>}
            {contactNumber && (
              <Badge variant="outline">Contact</Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideFilter;
