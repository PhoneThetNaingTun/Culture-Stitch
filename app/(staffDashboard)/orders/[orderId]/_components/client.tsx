"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import OrderCard from "./orderCard";
import {
  Box,
  Calendar,
  Coins,
  Locate,
  Mail,
  Phone,
  Pin,
  ShoppingBag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpdateOrder } from "@/store/Slices/OrderSlice";
import { useToast } from "@/hooks/use-toast";
import OrderCancelDialog from "./orderCancelDialog";
import { OrderDeliveringDialog } from "./orderDeliveringDialog";
import { OrderDeliveredDialog } from "./orderDeliveredDialog";

export default function OrderDetailPageClient() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const param = useParams();
  const { toast } = useToast();
  const { orderId } = param;
  const { orders, orderLoading } = useAppSelector((state) => state.Order);
  const { orderDetails } = useAppSelector((state) => state.OrderDetails);
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const { sizes } = useAppSelector((state) => state.Size);
  const { colors } = useAppSelector((state) => state.Color);
  const { productColors } = useAppSelector((state) => state.ProductColor);
  const { products } = useAppSelector((state) => state.Product);
  const { customers } = useAppSelector((state) => state.Customer);
  const { user } = useAppSelector((state) => state.DashBoardApp);
  const order = orders.find((item) => item.id === orderId);
  const orderDetail = orderDetails.filter((item) => item.orderId === order?.id);
  const orderDetailIds = orderDetail.map((item) => item.id);
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
  const customer = customers.find((item) => item.id === order?.userId);
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
  const handleCancelOrder = () => {
    dispatch(
      UpdateOrder({
        id: orderId as string,
        orderStatus: "Canceled",
        onSuccess(data) {
          toast({ title: data, variant: "default" });
          router.push("/orders");
        },
        onError(data) {
          toast({ title: data, variant: "destructive" });
        },
      })
    );
  };
  const handleConfirmOrder = () => {
    dispatch(
      UpdateOrder({
        id: orderId as string,
        orderStatus: "Confirmed",
        userId: user.id,
        orderDetailIds,
        onSuccess(data) {
          toast({ title: data, variant: "default" });
          router.push("/orders");
        },
        onError(data) {
          toast({ title: data, variant: "destructive" });
        },
      })
    );
  };

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/over-view">DashBoard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/orders">Orders</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Order Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
            <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <span>Name:</span>
              <span className="font-semibold">{customer?.name}</span>
            </p>
            <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700 break-words">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              <span>Email:</span>
              <span className="font-semibold break-all">{customer?.email}</span>
            </p>
            <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
              <Pin className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              <span>Address:</span>
              <span className="font-semibold">{customer?.address}</span>
            </p>
            <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              <span>Phone:</span>
              <span className="font-semibold">{customer?.phone}</span>
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
                {order && new Date(order.createdAt).toLocaleString("en-Us")}
              </span>
            </p>
          </div>
          {order?.orderStatus === "Pending" ? (
            <div className="my-3 flex justify-end items-center gap-3">
              <OrderCancelDialog
                onClick={handleCancelOrder}
                loading={orderLoading}
              />
              <Button
                className="bg-green-500 hover:bg-green-700"
                disabled={orderLoading}
                onClick={handleConfirmOrder}
              >
                Confirm
              </Button>
            </div>
          ) : null}
          {order?.orderStatus === "Confirmed" ? (
            <div className="my-3 flex justify-end items-center gap-3">
              <OrderDeliveringDialog id={orderId as string} />
            </div>
          ) : null}
          {order?.orderStatus === "Delivering" ? (
            <div className="my-3 flex justify-end items-center gap-3">
              <OrderDeliveredDialog id={orderId as string} />
            </div>
          ) : null}
        </div>
        <div>
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
    </div>
  );
}
