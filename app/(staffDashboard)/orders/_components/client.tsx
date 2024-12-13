"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { orderColumn } from "./order-column";
import { useAppSelector } from "@/store/hooks";
import { orderCancelColumn } from "./order-cancel-column";
import { orderAfterConfirmedColumn } from "./order-afterConfirm-column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OrderPageClient() {
  const { orders } = useAppSelector((state) => state.Order);
  const { orderDetails } = useAppSelector((state) => state.OrderDetails);
  const { customers } = useAppSelector((state) => state.Customer);
  const orderData = orders.map((item) => {
    const id = item.id;
    const name = customers.find(
      (customer) => customer.id === item.userId
    )?.name;
    const email = customers.find(
      (customer) => customer.id === item.userId
    )?.email;
    const phone = customers.find(
      (customer) => customer.id === item.userId
    )?.phone;
    const orderDetail = orderDetails.filter(
      (orderDetail) => orderDetail.orderId === item.id
    );
    const quantity = orderDetail.reduce((acc, curr) => {
      const nowQuantity = curr.quantity;
      const totalQuantity = acc + nowQuantity;
      return totalQuantity;
    }, 0);
    const status = item.orderStatus;
    const createdDate = item.createdAt;
    return { id, name, email, phone, quantity, status, createdDate };
  });
  const orderPending = orderData.filter((item) => item.status === "Pending");
  const orderConfirmed = orderData.filter(
    (item) => item.status === "Confirmed"
  );
  const orderCanceled = orderData.filter((item) => item.status === "Canceled");
  const orderDelivered = orderData.filter(
    (item) => item.status === "Delivered"
  );
  const orderDelivering = orderData.filter(
    (item) => item.status === "Delivering"
  );
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
              <BreadcrumbItem>
                <BreadcrumbPage>Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <Tabs defaultValue="pending" className="">
          <TabsList className="">
            <TabsTrigger value="pending">Orders</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed Orders</TabsTrigger>
            <TabsTrigger value="delivering">Delivering Orders</TabsTrigger>
            <TabsTrigger value="delivered">Delivered Orders</TabsTrigger>
            <TabsTrigger value="canceled">Cancled Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <p className="font-roboto font-semibold text-2xl">
              Orders : {orderPending.length}
            </p>

            <DataTable
              //@ts-ignore
              columns={orderColumn}
              data={orderPending}
              filterKey="name"
            />
          </TabsContent>
          <TabsContent value="confirmed">
            {" "}
            <p className="font-roboto font-semibold text-2xl">
              Confirmed Orders : {orderConfirmed.length}
            </p>
            <DataTable
              //@ts-ignore
              columns={orderAfterConfirmedColumn}
              data={orderConfirmed}
              filterKey="name"
            />{" "}
          </TabsContent>
          <TabsContent value="delivering">
            <p className="font-roboto font-semibold text-2xl">
              Delivering Orders : {orderDelivering.length}
            </p>
            <DataTable
              //@ts-ignore
              columns={orderAfterConfirmedColumn}
              data={orderDelivering}
              filterKey="name"
            />
          </TabsContent>
          <TabsContent value="delivered">
            <p className="font-roboto font-semibold text-2xl">
              Delivered Orders : {orderDelivered.length}
            </p>
            <DataTable
              //@ts-ignore
              columns={orderAfterConfirmedColumn}
              data={orderDelivered}
              filterKey="name"
            />
          </TabsContent>
          <TabsContent value="canceled">
            <p className="font-roboto font-semibold text-2xl">
              Canceled Orders : {orderCanceled.length}
            </p>
            <DataTable
              //@ts-ignore
              columns={orderCancelColumn}
              data={orderCanceled}
              filterKey="name"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
