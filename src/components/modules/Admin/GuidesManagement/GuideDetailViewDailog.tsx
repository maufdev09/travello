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
  Calendar,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
  Languages,
  ShieldCheck,
  DollarSign,
  Briefcase,
} from "lucide-react";
import { IGuide } from "@/types/userInterface";
import InfoRow from "@/components/shared/InfowRow";

interface IGuideDetailViewDialogProps {
  open: boolean;
  onClose: () => void;
  guide: IGuide | null;
}

const GuideDetailViewDialog = ({
  open,
  onClose,
  guide,
}: IGuideDetailViewDialogProps) => {
  if (!guide) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Guide Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* ===== Header ===== */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={guide.profilePhoto || ""} alt={guide.name} />
              <AvatarFallback className="text-2xl">
                {getInitials(guide.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{guide.name}</h2>

              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {guide.email}
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge
                  variant={
                    guide.verificationStatus === "APPROVED"
                      ? "default"
                      : guide.verificationStatus === "REJECTED"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {guide.verificationStatus}
                </Badge>

                {guide.isDeleted && (
                  <Badge variant="destructive">Deleted</Badge>
                )}
              </div>
            </div>
          </div>

          {/* ===== Sections ===== */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold text-lg">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow label="Guide ID" value={guide.id || "N/A"} />
                <InfoRow
                  label="Bio"
                  value={guide.bio || "Not provided"}
                />
              </div>
            </div>

            <Separator />

            {/* Professional Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">
                  Professional Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow
                  label="Languages"
                  value={
                    guide.languages?.length
                      ? guide.languages.join(", ")
                      : "Not specified"
                  }
                />

                <InfoRow
                  label="Expertise"
                  value={
                    guide.expertise?.length
                      ? guide.expertise.join(", ")
                      : "Not specified"
                  }
                />

                <InfoRow
                  label="Daily Rate"
                  value={
                    guide.dailyRate
                      ? `৳ ${guide.dailyRate}`
                      : "Not specified"
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Phone className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Phone"
                    value={guide.contactNumber || "Not provided"}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Email" value={guide.email} />
                </div>

                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Address"
                    value={guide.address || "Not provided"}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Account Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow
                  label="Verification Status"
                  value={guide.verificationStatus}
                />
                <InfoRow
                  label="Created At"
                  value={
                    guide.createdAt
                      ? formatDateTime(guide.createdAt)
                      : "N/A"
                  }
                />
                <InfoRow
                  label="Last Updated"
                  value={
                    guide.updatedAt
                      ? formatDateTime(guide.updatedAt)
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

export default GuideDetailViewDialog;
