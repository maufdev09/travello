import PaymentResultPage from "@/components/shared/PaymentResultPage";
import { Suspense } from "react";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentResultPage type="success" />
    </Suspense>
  );
}
