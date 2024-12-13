"use server";

import { prisma } from "@/lib/prisma";
import { CartItems } from "@/types/checkOut";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, name, address, productSCIds, city, state, phone } =
    await req.json();
  if (
    !userId ||
    !name ||
    !address ||
    productSCIds.length <= 0 ||
    !city ||
    !state ||
    !phone
  ) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  const findUser = await prisma.user.findFirst({ where: { id: userId } });

  if (!findUser) {
    return NextResponse.json({ error: "User doesn't exist" }, { status: 404 });
  }

  if (findUser.role !== "User") {
    return NextResponse.json(
      {
        error:
          "Admin cannot order! Please use your user account to order items!",
      },
      { status: 400 }
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name, address, phone },
  });

  const newOrder = await prisma.orders.create({
    data: { userId, city, state },
  });
  const newOrderDetails = await prisma.$transaction(
    productSCIds.map((item: CartItems) =>
      prisma.orderDetails.create({
        data: {
          productSCId: item.productSCId as string,
          quantity: item.quantity,
          orderId: newOrder.id,
        },
      })
    )
  );
  return NextResponse.json(
    { message: "Ordered Successful!", updatedUser, newOrder, newOrderDetails },
    { status: 200 }
  );
}
