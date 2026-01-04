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
  ShieldCheck,
  User,
  Calendar,
} from "lucide-react";
import InfoRow from "@/components/shared/InfowRow";
import { IAdmin } from "@/types/userInterface";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */


interface AdminDetailViewDialogProps {
  open: boolean;
  onClose: () => void;
  admin: IAdmin | null;
}

/* -------------------------------------------------------------------------- */
/*                              COMPONENT                                     */
/* -------------------------------------------------------------------------- */
const AdminDetailViewDialog = ({
  open,
  onClose,
  admin,
}: AdminDetailViewDialogProps) => {
  if (!admin) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Admin Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* ================= HEADER ================= */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={admin.profilePhoto || ""}
                alt={admin.name}
              />
              <AvatarFallback className="text-2xl">
                {getInitials(admin.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{admin.name}</h2>

              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {admin.email}
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="default">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Admin
                </Badge>

                {admin.isDeleted && (
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
                <User className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-lg">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <InfoRow label="Admin ID" value={admin.id} />
                <InfoRow label="Role" value="Administrator" />
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
                  value={admin.contactNumber || "Not provided"}
                />
                <InfoRow label="Email" value={admin.email} />
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
                  value={admin.isDeleted ? "Inactive" : "Active"}
                />
                <InfoRow
                  label="Created At"
                  value={
                    admin.createdAt
                      ? formatDateTime(admin.createdAt)
                      : "N/A"
                  }
                />
                <InfoRow
                  label="Last Updated"
                  value={
                    admin.updatedAt
                      ? formatDateTime(admin.updatedAt)
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

export default AdminDetailViewDialog;
