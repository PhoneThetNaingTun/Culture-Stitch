"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/middleware";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const boards = await prisma.board.findFirst({
    where: { onDisplay: true },
  });

  const types = await prisma.types.findMany();
  const colors = await prisma.colors.findMany();
  const sizes = await prisma.sizes.findMany();
  const products = await prisma.products.findMany({
    orderBy: { createdAt: "desc" },
  });
  const productCategories = await prisma.productCategories.findMany();
  const productColors = await prisma.productColors.findMany();
  const productSizeColors = await prisma.productSizeColors.findMany();
  const productCategoryTypes = await prisma.productCategoryTypes.findMany({
    orderBy: { createdAt: "asc" },
  });
  const reviews = await prisma.reviews.findMany();

  if (session) {
    const { user } = session;
    const email = user.email as string;
    const userFromDb = await prisma.user.findFirst({ where: { email } });
    if (userFromDb) {
      const orders = await prisma.orders.findMany({
        where: { userId: userFromDb.id },
      });
      const orderIds = orders.map((item) => item.id);
      const orderDetails = await prisma.orderDetails.findMany({
        where: { orderId: { in: orderIds } },
      });
      return NextResponse.json({
        boards,
        user: userFromDb,
        staffAndAdmins: [],
        productCategories,
        types,
        colors,
        sizes,
        products,
        productColors,
        productSizeColors,
        productCategoryTypes,
        orders,
        orderDetails,
        orderConfirms: [],
        reviews,
      });
    } else {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({
      boards,
      user: {},
      staffAndAdmins: [],
      productCategories,
      types,
      colors,
      sizes,
      products,
      productColors,
      productSizeColors,
      productCategoryTypes,
      orders: [],
      orderDetails: [],
      orderConfirms: [],
      reviews,
    });
  }
}
