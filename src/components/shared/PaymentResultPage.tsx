"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, CircleSlash2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PaymentPageType = "success" | "fail" | "cancel";

interface PaymentResultPageProps {
  type: PaymentPageType;
}

type StatusType = "success" | "fail" | "cancel" | "unknown";

const normalizeStatus = (value: string | null): StatusType => {
  if (!value) return "unknown";

  const status = value.toLowerCase();

  if (status.includes("success")) return "success";
  if (status.includes("fail")) return "fail";
  if (status.includes("cancel")) return "cancel";

  return "unknown";
};

const typeConfig: Record<PaymentPageType, { title: string; description: string }> = {
  success: {
    title: "Payment Successful",
    description: "Your booking payment is confirmed.",
  },
  fail: {
    title: "Payment Failed",
    description: "Your payment could not be completed.",
  },
  cancel: {
    title: "Payment Cancelled",
    description: "You cancelled the payment request.",
  },
};

const statusClasses: Record<StatusType, string> = {
  success: "bg-green-100 text-green-700 border-green-200",
  fail: "bg-red-100 text-red-700 border-red-200",
  cancel: "bg-amber-100 text-amber-700 border-amber-200",
  unknown: "bg-gray-100 text-gray-700 border-gray-200",
};

const statusLabel: Record<StatusType, string> = {
  success: "Success",
  fail: "Failed",
  cancel: "Cancelled",
  unknown: "Unknown",
};

export default function PaymentResultPage({ type }: PaymentResultPageProps) {
  const searchParams = useSearchParams();

  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const queryStatus = normalizeStatus(searchParams.get("status"));

  const uiStatus = queryStatus === "unknown" ? type : queryStatus;
  const config = typeConfig[type];

  const Icon =
    uiStatus === "success" ? CheckCircle2 : uiStatus === "fail" ? XCircle : CircleSlash2;

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto">
            <Icon className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl">{config.title}</CardTitle>
          <CardDescription>{message || config.description}</CardDescription>
          <div>
            <Badge className={statusClasses[uiStatus]}>{statusLabel[uiStatus]}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2 rounded-md border p-4">
            <p className="text-sm text-muted-foreground">Transaction ID</p>
            <p className="break-all text-sm font-medium">{transactionId || "Not provided"}</p>
          </div>

          <div className="space-y-2 rounded-md border p-4">
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="text-sm font-medium">{amount ? `${amount}` : "Not provided"}</p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href="/" className="w-full sm:w-auto">
              <Button className="w-full">Back to Home</Button>
            </Link>
            <Link href="/listings" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                Explore More Tours
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
