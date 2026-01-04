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

const AdminFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  /* -------------------------------------------------------------------------- */
  /*                                LOCAL STATE                                 */
  /* -------------------------------------------------------------------------- */
  const [status, setStatus] = useState(
    searchParams.get("isDeleted") || ""
  );
  const [email, setEmail] = useState(
    searchParams.get("email") || ""
  );
  const [contactNumber, setContactNumber] = useState(
    searchParams.get("contactNumber") || ""
  );

  const debouncedEmail = useDebounce(email, 500);
  const debouncedContact = useDebounce(contactNumber, 500);

  /* -------------------------------------------------------------------------- */
  /*                          SYNC STATE → URL PARAMS                            */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (status) {
      params.set("isDeleted", status);
    } else {
      params.delete("isDeleted");
    }

    if (debouncedEmail) {
      params.set("email", debouncedEmail);
    } else {
      params.delete("email");
    }

    if (debouncedContact) {
      params.set("contactNumber", debouncedContact);
    } else {
      params.delete("contactNumber");
    }

    params.set("page", "1");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, debouncedEmail, debouncedContact]);

  /* -------------------------------------------------------------------------- */
  /*                               CLEAR FILTERS                                 */
  /* -------------------------------------------------------------------------- */
  const clearAllFilters = () => {
    setStatus("");
    setEmail("");
    setContactNumber("");

    startTransition(() => {
      router.replace(pathname);
    });
  };

  const activeFiltersCount =
    (status ? 1 : 0) +
    (email ? 1 : 0) +
    (contactNumber ? 1 : 0);

  /* -------------------------------------------------------------------------- */
  /*                                   UI                                       */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="space-y-3">
      {/* Row 1: Search + Refresh */}
      <div className="flex items-center gap-3">
        <SearchFiilter
          paramName="searchTerm"
          placeholder="Search admins..."
        />
        <RefreshButton />
      </div>

      {/* Row 2: Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Status */}
        <Select
          value={status}
          onValueChange={(value) =>
            setStatus(value === "all" ? "" : value)
          }
          disabled={isPending}
        >
          <SelectTrigger className="w-[180px] h-10">
            <SelectValue placeholder="Account Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="false">Active</SelectItem>
            <SelectItem value="true">Inactive</SelectItem>
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

        {/* Contact */}
        <Input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="w-[180px] h-10"
          disabled={isPending}
        />

        {/* Clear */}
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

      {/* Row 3: Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="min-h-8 flex items-center">
          <div className="flex flex-wrap gap-2">
            {status && (
              <Badge variant="outline">
                Status: {status === "true" ? "Inactive" : "Active"}
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

export default AdminFilter;
