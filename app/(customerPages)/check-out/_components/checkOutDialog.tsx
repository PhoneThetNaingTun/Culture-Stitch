"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewCheckOutPayload } from "@/types/checkOut";
import React, { useState } from "react";

interface Prop {
  onClick: () => void;
  checkOutData: NewCheckOutPayload | undefined;
  loading: boolean;
}

export default function CheckOutDialog({
  onClick,
  checkOutData,
  loading,
}: Prop) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Order</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogTitle>Proceed To Order?</DialogTitle>
        <DialogDescription>
          Please fill out every fields before you order!
        </DialogDescription>
        <div>
          <p>Name : {checkOutData?.name}</p>
          <p>Address :{checkOutData?.address}</p>
          <p>Phone : {checkOutData?.phone}</p>
          <p>City : {checkOutData?.city}</p>
          <p>State : {checkOutData?.state}</p>
        </div>
        <p>
          Note :{" "}
          <span className="text-red-500">
            Make Sure Every Information is correct! This cannot be undone!
          </span>
        </p>
        <Button onClick={onClick} disabled={loading}>
          Order Now
        </Button>
      </DialogContent>
    </Dialog>
  );
}
