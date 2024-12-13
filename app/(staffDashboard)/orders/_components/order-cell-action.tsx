"use client";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { OrderColumn } from "./order-column";

interface Prop {
  data: OrderColumn;
}

export const CellAction = ({ data }: Prop) => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          router.push(`/orders/${data.id}`);
        }}
      >
        Check Order
      </Button>
    </div>
  );
};
