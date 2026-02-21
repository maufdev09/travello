import PaymentResultPage from "@/components/shared/PaymentResultPage";
import { Suspense } from "react";

export default function PaymentFailPage() {
  return (
    <Suspense fallback={null}>
      <PaymentResultPage type="fail" />
    </Suspense>
  );
}
