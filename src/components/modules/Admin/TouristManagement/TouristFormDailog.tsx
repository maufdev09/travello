"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  createTouristByAdmin,
  updateTouristByAdmin,
} from "@/services/admin/touristManagement";
import { ITourist } from "@/types/userInterface";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */
interface TouristFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tourist?: ITourist | null;
}

/* -------------------------------------------------------------------------- */
/*                              COMPONENT                                     */
/* -------------------------------------------------------------------------- */
const TouristFormDialog = ({
  open,
  onClose,
  onSuccess,
  tourist,
}: TouristFormDialogProps) => {
  const isEdit = !!tourist;

  const [state, formAction, isPending] = useActionState(
    isEdit
      ? updateTouristByAdmin.bind(null, tourist!.id)
      : createTouristByAdmin,
    null
  );

  /* ------------------------------------------------------------------------ */
  /*                              SIDE EFFECTS                                */
  /* ------------------------------------------------------------------------ */
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Tourist saved successfully");
      onSuccess();
      onClose();
    } else if (state.success === false) {
      toast.error(state.message || "Something went wrong");
    }
  }, [state, onClose, onSuccess]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Tourist" : "Create New Tourist"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="flex flex-col flex-1 min-h-0">
          {/* ================= FORM BODY ================= */}
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Tourist name"
                defaultValue={tourist?.name}
              />
              <InputFieldError state={state} field="name" />
            </Field>

            {/* Email (create only) */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tourist@example.com"
                />
                <InputFieldError state={state} field="email" />
              </Field>
            )}

            {/* Password (create only) */}
            {!isEdit && (
              <>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                  />
                  <InputFieldError state={state} field="password" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                  />
                  <InputFieldError state={state} field="confirmPassword" />
                </Field>
              </>
            )}

            {/* Contact Number (edit only) */}
            {isEdit && (
              <Field>
                <FieldLabel htmlFor="contactNumber">
                  Contact Number
                </FieldLabel>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="+8801XXXXXXXXX"
                  defaultValue={tourist?.contactNumber ?? ""}
                />
                <InputFieldError state={state} field="contactNumber" />
              </Field>
            )}

            {/* Address (edit only – optional) */}
            {isEdit && (
              <Field>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <Input
                  id="address"
                  name="address"
                  placeholder="Dhaka, Bangladesh"
                  defaultValue={tourist?.address ?? ""}
                />
                <InputFieldError state={state} field="address" />
              </Field>
            )}
          </div>

          {/* ================= FOOTER ================= */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-muted/40">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEdit
                ? "Update Tourist"
                : "Create Tourist"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TouristFormDialog;
