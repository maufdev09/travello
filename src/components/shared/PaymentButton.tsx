'use client';

import { Button } from '@/components/ui/button';

export default function PaymentButton() {
  const handlePayment = () => {
    // Implement payment logic here
    alert('Payment functionality to be implemented');
  };

  return (
    <Button onClick={handlePayment} className="w-full" size="lg">
      Proceed to Payment
    </Button>
  );
}