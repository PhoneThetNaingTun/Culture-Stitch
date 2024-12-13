import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { $Enums } from "@prisma/client";
import React from "react";

type orderItem = {
  id: string;
  orderCreatedDate: Date;
  quantity: number | undefined;
  city: string;
  state: string;
  name: string | null;
  email: string | null;
  status: $Enums.Status;
};
interface Prop {
  data: orderItem;
}

export default function OrderCard({ data }: Prop) {
  return (
    <Card className="p-5">
      <CardTitle>OrderId : {data.id}</CardTitle>
      <CardDescription className="my-2">
        <p>Name: {data.name}</p>
        <p>Email : {data.email}</p>
        <p>City : {data.city}</p>
        <p>State : {data.state}</p>
        <p>Order Quantity: {data.quantity}</p>
        <p>
          Order Date:
          {new Date(data.orderCreatedDate).toLocaleDateString("en-Us")}
        </p>
      </CardDescription>
      <CardContent className="flex justify-end p-0">
        <p
          className={cn(
            "font-semibold text-sm text-white bg-green-500 px-3 py-1 rounded-sm",
            data.status === "Pending" && "bg-yellow-500",
            data.status === "Canceled" && "bg-red-500"
          )}
        >
          {data.status}
        </p>
      </CardContent>
    </Card>
  );
}
