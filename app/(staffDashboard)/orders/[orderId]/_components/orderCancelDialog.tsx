"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Prop {
  onClick: () => void;
  loading: boolean;
}

export default function OrderCancelDialog({ onClick, loading }: Prop) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-700">Cancel</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogTitle>Are you sure you want to cancel this order?</DialogTitle>
        <DialogDescription>This cannot be undone!</DialogDescription>
        <div className="flex justify-end items-center gap-3">
          <DialogClose>
            {" "}
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            className="bg-red-500 hover:bg-red-700"
            onClick={onClick}
            disabled={loading}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
