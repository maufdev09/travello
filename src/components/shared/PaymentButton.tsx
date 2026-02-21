"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBooking } from "@/services/listing/listingManagement";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Listing } from "@/types/ListingType";

interface PaymentButtonProps {
  listing: Listing;
  bookingDateId?: string;
  disabled?: boolean;
  disabledText?: string;
}

export default function PaymentButton({
  listing,
  bookingDateId,
  disabled = false,
  disabledText = "All Slots Booked",
}: PaymentButtonProps) {
  const slots = listing.availabilities ?? [];
  const initialSlotId = bookingDateId ?? slots.find((slot) => !slot.booked)?.id ?? "";

  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(initialSlotId);

  const totalPrice = guests * listing.price;
  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId);
  const selectedSlotBooked = Boolean(selectedSlot?.booked);
  const payDisabled = disabled || loading || !selectedSlotId || selectedSlotBooked;

  const formatSlotDate = (date?: string) =>
    date
      ? new Date(date).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "N/A";

  const handlePayment = async () => {
    if (!selectedSlotId || selectedSlotBooked) {
      alert("No available slots for booking.");
      return;
    }

    const getUser = await getUserInfo();
    if (!getUser?.id) {
      const redirectPath = `/book-now?id=${listing.id}`;
      alert("Please login first to continue booking.");
      window.location.href = `/login?redirect=${encodeURIComponent(redirectPath)}`;
      return;
    }

    try {
      setLoading(true);
      const response = await createBooking({
        guests,
        totalPrice,
        currency: listing.currency,
        listingId: listing.id,
        userId: getUser.id,
        guideId: listing.guide.id,
        bookingDateId: selectedSlotId,
      });

      if (response?.success) {
        window.location.href = response.data.payment;
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full" disabled={disabled}>
        {disabled ? disabledText : "Book Now"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Number of Guests</label>
              <Input
                type="number"
                min={1}
                max={listing.maxGroupSize}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Availability Slot</label>
              <Select value={selectedSlotId} onValueChange={setSelectedSlotId}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select a slot" />
                </SelectTrigger>
                <SelectContent>
                  {slots.map((slot) => (
                    <SelectItem key={slot.id} value={slot.id} disabled={Boolean(slot.booked)}>
                      {formatSlotDate(slot.startAt)} - {formatSlotDate(slot.endAt)}{" "}
                      {slot.booked ? "(Booked)" : "(Available)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedSlotBooked ? (
                <p className="mt-1 text-xs text-red-600">This slot is booked. Please select another slot.</p>
              ) : null}
            </div>

            <div className="flex justify-between text-lg font-semibold">
              <span>Total Price:</span>
              <span>
                {listing.currency} {totalPrice}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handlePayment} disabled={payDisabled} className="w-full">
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
