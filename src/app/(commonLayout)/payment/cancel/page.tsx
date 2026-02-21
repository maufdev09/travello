import PaymentResultPage from "@/components/shared/PaymentResultPage";
import { Suspense } from "react";

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={null}>
      <PaymentResultPage type="cancel" />
    </Suspense>
  );
}
