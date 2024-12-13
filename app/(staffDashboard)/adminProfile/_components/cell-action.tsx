"use client";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { OrderConfirmColumn } from "./order-confirm-column";

interface Prop {
  data: OrderConfirmColumn;
}

export const CellAction = ({ data }: Prop) => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          router.push(`/orders/${data.orderId}`);
        }}
      >
        Check Order
      </Button>
    </div>
  );
};
