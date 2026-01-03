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
import { createGuide, updateGuide } from "@/services/admin/guideManagement";
import { IGuide } from "@/types/userInterface";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface IGuidesFormDaialogProps {
  open: boolean;
  onclose: () => void;
  onSuccess: () => void;
  guide?: IGuide;
}

const GuidesFormDaialog = ({
  open,
  onclose,
  onSuccess,
  guide,
}: IGuidesFormDaialogProps) => {
  const isEdit = !!guide;
  const [preview, setPreview] = useState<string | null>(
    guide?.profilePhoto ?? null
  );

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateGuide.bind(null, guide?.id!) : createGuide,
    null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onSuccess();
      onclose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onclose]);

  return (
    <Dialog open={open} onOpenChange={onclose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Guide" : "Add New Guide"}</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Guide name"
                defaultValue={guide?.name}
              />
              <InputFieldError state={state} field="name" />
            </Field>

            {/* Email (only create) */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="guide@example.com"
                />
                <InputFieldError state={state} field="email" />
              </Field>
            )}

            {/* Password (only create) */}
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

            {/* Bio */}
            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Input
                id="bio"
                name="bio"
                placeholder="Short bio"
                defaultValue={guide?.bio ?? ""}
              />
              <InputFieldError state={state} field="bio" />
            </Field>

            {/* Languages (comma separated) */}
            <Field>
              <FieldLabel htmlFor="languages">Languages</FieldLabel>
              <Input
                id="languages"
                name="languages"
                placeholder="English, Bangla"
                defaultValue={guide?.languages?.join(", ")}
              />
              <InputFieldError state={state} field="languages" />
            </Field>

            {/* Expertise */}
            <Field>
              <FieldLabel htmlFor="expertise">Expertise</FieldLabel>
              <Input
                id="expertise"
                name="expertise"
                placeholder="History, Culture"
                defaultValue={guide?.expertise?.join(", ")}
              />
              <InputFieldError state={state} field="expertise" />
            </Field>

            {/* Daily Rate */}
            <Field>
              <FieldLabel htmlFor="dailyRate">Daily Rate</FieldLabel>
              <Input
                id="dailyRate"
                name="dailyRate"
                type="number"
                placeholder="1500"
                defaultValue={guide?.dailyRate ?? undefined}
              />
              <InputFieldError state={state} field="dailyRate" />
            </Field>

            {/* Contact Number */}
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                placeholder="+8801XXXXXXXXX"
                defaultValue={guide?.contactNumber ?? undefined}
              />
              <InputFieldError state={state} field="contactNumber" />
            </Field>

            {/* Address */}
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                placeholder="Dhaka, Bangladesh"
                defaultValue={guide?.address ?? undefined}
              />
              <InputFieldError state={state} field="address" />
            </Field>

            {/* Profile Photo */}
            {/* <Field>
              <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
              <Input id="file" name="file" type="file" accept="image/*" />
              <InputFieldError state={state} field="file" />
            </Field> */}

            <Field>
              <FieldLabel htmlFor="file">Profile Photo</FieldLabel>

              {/* Preview */}
              {preview && (
                <div className="mb-2">
                  <Image
                    src={preview}
                    alt="Guide preview"
                    width={96}
                    height={96}
                    className="rounded-md object-cover border"
                  />
                </div>
              )}

              <Input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <InputFieldError state={state} field="file" />
            </Field>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={onclose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEdit
                ? "Update Guide"
                : "Create Guide"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GuidesFormDaialog;
