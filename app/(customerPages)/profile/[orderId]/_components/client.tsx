"use client";

import OrderCard from "@/app/(staffDashboard)/orders/[orderId]/_components/orderCard";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Calendar,
  Coins,
  Mail,
  Phone,
  Pin,
  ShoppingBag,
  User,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OrderDetailClient() {
  const router = useRouter();
  const param = useParams();
  const { orderId } = param;
  const { orders } = useAppSelector((state) => state.Order);
  const { orderDetails } = useAppSelector((state) => state.OrderDetails);
  const { user } = useAppSelector((state) => state.CustomerApp);
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const { productColors } = useAppSelector((state) => state.ProductColor);
  const { sizes } = useAppSelector((state) => state.Size);
  const { colors } = useAppSelector((state) => state.Color);
  const { products } = useAppSelector((state) => state.Product);
  const order = orders.find((item) => item.id === orderId);
  const orderDetail = orderDetails.filter((item) => item.orderId === order?.id);
  const productSizeColorData = productSizeColors.filter((item) =>
    orderDetail.find((order) => order.productSCId === item.id)
  );

  const OrderData = productSizeColorData.map((item) => {
    const id = item.id;
    const productColor = productColors.find(
      (productColor) => productColor.id === item.productColorId
    );
    const color = colors.find(
      (color) => color.id === productColor?.colorId
    )?.color;
    const image = productColor?.image;
    const size = sizes.find((size) => size.id === item.sizeId)?.size;
    const productName = products.find(
      (product) => product.id === productColor?.productId
    )?.name;
    const productPrice = products.find(
      (product) => product.id === productColor?.productId
    )?.price;
    const quantity = orderDetail.find(
      (order) => order.productSCId === item.id
    )?.quantity;

    return { id, color, image, size, productName, productPrice, quantity };
  });
  const TotalPrice = OrderData.reduce((acc, curr) => {
    const price = curr.productPrice;
    const quantities = curr.quantity;
    const totalPrice = Number(price) * Number(quantities);
    acc += totalPrice;
    return acc;
  }, 0);
  const TotalQuantity = OrderData.reduce((acc, curr) => {
    const quantity = curr.quantity;
    acc += Number(quantity);
    return acc;
  }, 0);
  useEffect(() => {
    if (!order) {
      return router.push("/home");
    }
  }, [order]);
  if (!order) {
    return null;
  }

  return (
    <div className=" lg:px-28 3xl:px-96">
      <div className="p-6 shadow-lg rounded-lg">
        <p className="mb-4 text-lg sm:text-xl text-gray-800 break-words">
          Order Id: <span className="font-semibold">{order.id}</span>
        </p>
        <p className="mb-4 text-lg sm:text-xl text-gray-800 break-words">
          Status:{" "}
          <span
            className={cn(
              "font-semibold text-green-500",
              order.orderStatus === "Pending" && "text-yellow-500",
              order.orderStatus === "Canceled" && "text-red-500"
            )}
          >
            {order.orderStatus}
          </span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span>Name:</span>
            <span className="font-semibold">{user?.name}</span>
          </p>
          <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700 break-words">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            <span>Email:</span>
            <span className="font-semibold break-all">{user?.email}</span>
          </p>
          <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
            <Pin className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            <span>Address:</span>
            <span className="font-semibold">{user?.address}</span>
          </p>
          <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            <span>Phone:</span>
            <span className="font-semibold">{user?.phone}</span>
          </p>
          <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
            <Box className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
            <span>Order Quantities:</span>
            <span className="font-semibold">{TotalQuantity}</span>
          </p>
          <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
            <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            <span>Total Price:</span>
            <span className="font-semibold">{TotalPrice} Ks</span>
          </p>
          <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            <span>Order Date : </span>
            <span className="font-semibold">
              {new Date(order.createdAt).toLocaleString("en-Us")}
            </span>
          </p>
        </div>
      </div>

      <div className="p-6 my-5 border border-gray-300 ">
        <p className="font-roboto text-xl font-semibold flex items-center gap-2 ">
          <ShoppingBag className="w-7 h-7" /> Order Items
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4">
          {OrderData.map((item) => (
            <OrderCard orderItem={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
