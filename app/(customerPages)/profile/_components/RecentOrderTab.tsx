import { useAppSelector } from "@/store/hooks";
import { User } from "@prisma/client";
import React from "react";
import OrderCard from "./orderCard";
import Link from "next/link";
import { BanIcon } from "lucide-react";

interface Prop {
  user: User;
}

export default function RecentOrderTab({ user }: Prop) {
  const { orders } = useAppSelector((state) => state.Order);
  const { orderDetails } = useAppSelector((state) => state.OrderDetails);
  const orderCardData = orders.map((item) => {
    const id = item.id;
    const orderCreatedDate = item.createdAt;
    const orderDetail = orderDetails.filter(
      (orderDetail) => orderDetail.orderId === item.id
    );
    const quantity = orderDetail.reduce((acc, curr) => {
      acc += curr.quantity;
      return acc;
    }, 0);
    const city = item.city;
    const state = item.state;
    const name = user.name;
    const email = user.email;
    const status = item.orderStatus;
    return { id, orderCreatedDate, quantity, city, state, name, email, status };
  });
  return (
    <>
      {orderCardData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {orderCardData.map((item) => (
            <Link href={`/profile/${item.id}`}>
              {" "}
              <OrderCard data={item} key={item.id} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-52 flex justify-center items-center">
          <p className="font-roboto text-sm md:text-xl text-gray-600 flex items-center gap-1">
            <BanIcon className="w-5 h-5" /> You haven't ordered any order yet!
          </p>
        </div>
      )}
    </>
  );
}
