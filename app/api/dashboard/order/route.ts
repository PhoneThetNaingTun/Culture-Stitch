"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { id, orderStatus, userId, orderDetailIds } = await req.json();
  if (!id || !orderStatus) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  const isExist = await prisma.orders.findFirst({ where: { id } });

  if (!isExist) {
    return NextResponse.json(
      { error: "Order Doesn't Exist!" },
      { status: 404 }
    );
  }

  if (isExist.orderStatus === orderStatus) {
    return NextResponse.json({ error: "Order Already Upadted!" });
  }
  if (orderStatus === "Confirmed") {
    await prisma.orderConfirm.create({ data: { orderId: id, userId } });
  }
  if (orderDetailIds && orderStatus === "Confirmed") {
    const orderDetails = await prisma.orderDetails.findMany({
      where: { id: { in: orderDetailIds } },
    });

    const orderProductSizeColorIds = orderDetails.map(
      (item) => item.productSCId
    );

    const productSizeColors = await prisma.productSizeColors.findMany({
      where: { id: { in: orderProductSizeColorIds } },
    });

    await Promise.all(
      productSizeColors.map(async (productSizeColor) => {
        const totalOrderQuantity = orderDetails
          .filter(
            (orderDetail) => orderDetail.productSCId === productSizeColor.id
          )
          .reduce((sum, orderDetail) => sum + orderDetail.quantity, 0);

        const newQuantity = productSizeColor.quantity - totalOrderQuantity;

        // Update the quantity in the database
        await prisma.productSizeColors.update({
          where: { id: productSizeColor.id },
          data: { quantity: newQuantity },
        });
      })
    );
  }
  const updatedOrder = await prisma.orders.update({
    where: { id },
    data: { orderStatus },
  });
  const productSizeColors = await prisma.productSizeColors.findMany();
  return NextResponse.json(
    {
      message: "orderStatus Updated Successfully",
      updatedOrder,
      productSizeColors,
    },
    { status: 200 }
  );
}
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const orderExist = await prisma.orders.findFirst({ where: { id } });

  if (!orderExist) {
    return NextResponse.json(
      { error: "Order Doesn't Exist!" },
      { status: 404 }
    );
  }
  try {
    await prisma.orderDetails.deleteMany({ where: { orderId: orderExist.id } });
    await prisma.orders.delete({ where: { id } });

    return NextResponse.json(
      {
        message: "Order Deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "fail to delete",
      },
      { status: 500 }
    );
  }
}
