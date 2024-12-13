"use client";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { OrderColumn } from "./order-column";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DeleteOrder } from "@/store/Slices/OrderSlice";
import { useToast } from "@/hooks/use-toast";
import { RefreshCcw } from "lucide-react";

interface Prop {
  data: OrderColumn;
}

export const OrderCancelCellAction = ({ data }: Prop) => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { orderLoading } = useAppSelector((state) => state.Order);
  const handleDeleteOrder = () => {
    dispatch(
      DeleteOrder({
        id: data.id,
        onSuccess: (message) => {
          toast({
            title: message,
            variant: "default",
          });
          router.push("/orders");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500 text-white">Delete</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogTitle>This will permently delete this order!</DialogTitle>
        <DialogDescription>This cannot be undone!</DialogDescription>
        <div className="flex justify-end">
          <Button
            className="bg-red-500"
            onClick={handleDeleteOrder}
            disabled={orderLoading}
          >
            {orderLoading ? (
              <RefreshCcw className="w-4 h-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
