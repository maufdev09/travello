"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
} from "lucide-react";
import InfoRow from "@/components/shared/InfowRow";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */
export interface ITourist {
  id: string;
  name: string;
  email: string;
  contactNumber?: string | null;
  address?: string | null;
  profilePhoto?: string | null;
  preferences?: string | null;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TouristDetailViewDialogProps {
  open: boolean;
  onClose: () => void;
  tourist: ITourist | null;
}

/* -------------------------------------------------------------------------- */
/*                              COMPONENT                                     */
/* -------------------------------------------------------------------------- */
const TouristDetailViewDialog = ({
  open,
  onClose,
  tourist,
}: TouristDetailViewDialogProps) => {
  if (!tourist) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Tourist Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* ================= HEADER ================= */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={tourist.profilePhoto || ""}
                alt={tourist.name}
              />
              <AvatarFallback className="text-2xl">
                {getInitials(tourist.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">
                {tourist.name}
              </h2>

              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {tourist.email}
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="secondary">Tourist</Badge>
                {tourist.isDeleted && (
                  <Badge variant="destructive">Inactive</Badge>
                )}
              </div>
            </div>
          </div>

          {/* ================= DETAILS ================= */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold text-lg">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow label="Tourist ID" value={tourist.id} />
                <InfoRow label="Role" value="Tourist" />
                {tourist.preferences && (
                  <InfoRow
                    label="Preferences"
                    value={tourist.preferences}
                  />
                )}
              </div>
            </div>

            <Separator />

            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Phone className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">
                  Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow
                  label="Phone"
                  value={tourist.contactNumber || "Not provided"}
                />
                <InfoRow label="Email" value={tourist.email} />
                <InfoRow
                  label="Address"
                  value={tourist.address || "Not provided"}
                />
              </div>
            </div>

            <Separator />

            {/* Account Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">
                  Account Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow
                  label="Account Status"
                  value={tourist.isDeleted ? "Inactive" : "Active"}
                />
                <InfoRow
                  label="Created At"
                  value={
                    tourist.createdAt
                      ? formatDateTime(tourist.createdAt)
                      : "N/A"
                  }
                />
                <InfoRow
                  label="Last Updated"
                  value={
                    tourist.updatedAt
                      ? formatDateTime(tourist.updatedAt)
                      : "N/A"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TouristDetailViewDialog;
