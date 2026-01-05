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
import { createListing, updateListing } from "@/services/listing/listingManagement";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface AvailabilitySlot {
  startAt: string;
  endAt: string;
  note?: string;
}

interface ListingFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  listing?: any;
}

/* -------------------------------------------------------------------------- */
/*                              COMPONENT                                     */
/* -------------------------------------------------------------------------- */

const ListingFormDialog = ({
  open,
  onClose,
  onSuccess,
  listing,
}: ListingFormDialogProps) => {
  const isEdit = !!listing;

  /* ------------------------ Image Preview ------------------------ */
  const [preview, setPreview] = useState<string | null>(
    listing?.images ?? null
  );

  /* ------------------------ Availability ------------------------- */
  const [availabilities, setAvailabilities] = useState<AvailabilitySlot[]>(
    listing?.availabilities?.map((a: any) => ({
      startAt: a.startAt.slice(0, 16),
      endAt: a.endAt.slice(0, 16),
      note: a.note || "",
    })) || []
  );

  /* ------------------------ Server Action ------------------------- */
  const [state, formAction, isPending] = useActionState(
    isEdit
      ? updateListing.bind(null, listing.id)
      : createListing,
    null
  );

  /* ------------------------ Effects ------------------------------- */
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Listing saved successfully");
      onSuccess();
      onClose();
    } else {
      toast.error(state.message || "Something went wrong");
    }
  }, [state, onClose, onSuccess]);

  /* ------------------------ Image Change -------------------------- */
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  /* ------------------------ Availability Helpers ------------------ */
  const addSlot = () =>
    setAvailabilities([...availabilities, { startAt: "", endAt: "", note: "" }]);

  const updateSlot = (
    index: number,
    field: keyof AvailabilitySlot,
    value: string
  ) => {
    const updated = [...availabilities];
    updated[index][field] = value;
    setAvailabilities(updated);
  };

  const removeSlot = (index: number) =>
    setAvailabilities(availabilities.filter((_, i) => i !== index));

  /* ------------------------ Submit Handler ------------------------- */
const handleSubmit = (formData: FormData) => {
  // 🛑 availability validation
  if (availabilities.some((a) => !a.startAt || !a.endAt)) {
    toast.error("Please fill all availability slots");
    return;
  }

  if (
    availabilities.some(
      (a) => new Date(a.endAt) <= new Date(a.startAt)
    )
  ) {
    toast.error("End time must be after start time");
    return;
  }

  const payload = {
    title: formData.get("title"),
    description: formData.get("description"),
    itinerary: formData.get("itinerary"),
    price: Number(formData.get("price")),
    currency: "BDT",
    durationHours: Number(formData.get("durationHours")),
    meetingPoint: formData.get("meetingPoint"),
    maxGroupSize: Number(formData.get("maxGroupSize")),
    city: formData.get("city"),
    category: formData.get("category"),

    // ✅ availability manual attach
    availabilities: availabilities.map((a) => ({
      startAt: new Date(a.startAt).toISOString(),
      endAt: new Date(a.endAt).toISOString(),
      note: a.note,
    })),
  };

  const finalFormData = new FormData();
  finalFormData.append("data", JSON.stringify(payload));

  // ✅ image attach
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    finalFormData.append("file", file);
  }

  formAction(finalFormData);
};

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Listing" : "Create Listing"}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input name="title" defaultValue={listing?.title} />
              <InputFieldError state={state} field="title" />
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input name="description" defaultValue={listing?.description} />
            </Field>

            <Field>
              <FieldLabel>Itinerary</FieldLabel>
              <Input name="itinerary" defaultValue={listing?.itinerary} />
            </Field>

            <Field>
              <FieldLabel>City</FieldLabel>
              <Input name="city" defaultValue={listing?.city} />
            </Field>

         <Field>
  <FieldLabel>Category</FieldLabel>

  <select
    name="category"
    defaultValue={listing?.category ?? "CUSTOM"}
    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
  >
    <option value="FOOD">Food</option>
    <option value="ART">Art</option>
    <option value="ADVENTURE">Adventure</option>
    <option value="HISTORY">History</option>
    <option value="NIGHTLIFE">Nightlife</option>
    <option value="SHOPPING">Shopping</option>
    <option value="CULTURE">Culture</option>
    <option value="CUSTOM">Custom</option>
  </select>

  <InputFieldError state={state} field="category" />
</Field>

            <Field>
              <FieldLabel>Price</FieldLabel>
              <Input type="number" name="price" defaultValue={listing?.price} />
            </Field>

            <Field>
              <FieldLabel>Duration (Hours)</FieldLabel>
              <Input
                type="number"
                name="durationHours"
                defaultValue={listing?.durationHours}
              />
            </Field>

            <Field>
              <FieldLabel>Meeting Point</FieldLabel>
              <Input
                name="meetingPoint"
                defaultValue={listing?.meetingPoint}
              />
            </Field>

            <Field>
              <FieldLabel>Max Group Size</FieldLabel>
              <Input
                type="number"
                name="maxGroupSize"
                defaultValue={listing?.maxGroupSize}
              />
            </Field>

            {/* Image */}
            <Field>
              <FieldLabel>Listing Image</FieldLabel>

              {preview && (
                <div className="mb-2">
                  <Image
                    src={preview}
                    alt="Listing preview"
                    width={120}
                    height={120}
                    className="rounded-md border object-cover"
                  />
                </div>
              )}

              <Input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Field>

            {/* Availability */}
            <div className="space-y-3">
              <FieldLabel>Availability Slots</FieldLabel>

              {availabilities.map((slot, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-2 border rounded p-3"
                >
                  <Input
                    type="datetime-local"
                    value={slot.startAt}
                    onChange={(e) =>
                      updateSlot(index, "startAt", e.target.value)
                    }
                  />

                  <Input
                    type="datetime-local"
                    value={slot.endAt}
                    onChange={(e) =>
                      updateSlot(index, "endAt", e.target.value)
                    }
                  />

                  <Input
                    placeholder="Note"
                    value={slot.note}
                    onChange={(e) =>
                      updateSlot(index, "note", e.target.value)
                    }
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeSlot(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button type="button" onClick={addSlot}>
                + Add Availability
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEdit
                ? "Update Listing"
                : "Create Listing"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ListingFormDialog;
