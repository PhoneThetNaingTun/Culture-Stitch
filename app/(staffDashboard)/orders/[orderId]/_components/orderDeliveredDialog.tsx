"use client";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { OrderColumn } from "../../_components/order-column";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DeleteOrder, UpdateOrder } from "@/store/Slices/OrderSlice";
import { useToast } from "@/hooks/use-toast";
import { RefreshCcw } from "lucide-react";

interface Prop {
  id: string;
}

export const OrderDeliveredDialog = ({ id }: Prop) => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { orderLoading } = useAppSelector((state) => state.Order);
  const handleConfirmOrder = () => {
    dispatch(
      UpdateOrder({
        id: id as string,
        orderStatus: "Delivered",
        onSuccess(message) {
          toast({ title: message, variant: "default" });
          router.push("/orders");
        },
        onError(error) {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white">Edit to Delivered</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogTitle>This will change the status to Delivered!</DialogTitle>
        <DialogDescription>This cannot be undone!</DialogDescription>
        <div className="flex justify-end">
          <Button
            className="bg-green-500"
            onClick={handleConfirmOrder}
            disabled={orderLoading}
          >
            {orderLoading ? (
              <RefreshCcw className="w-4 h-4 animate-spin" />
            ) : (
              "Update To Delivered"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
