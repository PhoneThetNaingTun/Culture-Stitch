"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/middleware";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (session) {
    const { user } = session;
    const email = user.email as string;
    const userFromDb = await prisma.user.findFirst({ where: { email } });
    if (userFromDb) {
      if (userFromDb.role === "User") {
        return NextResponse.json(
          { message: "Unauthorized", user: userFromDb },
          { status: 401 }
        );
      }
      const boards = await prisma.board.findMany();
      const staffAndAdmins = await prisma.user.findMany({
        where: { NOT: { role: "User" } },
      });
      const types = await prisma.types.findMany();
      const colors = await prisma.colors.findMany();
      const sizes = await prisma.sizes.findMany();
      const products = await prisma.products.findMany();
      const productCategories = await prisma.productCategories.findMany();
      const productColors = await prisma.productColors.findMany();
      const productSizeColors = await prisma.productSizeColors.findMany();
      const productCategoryTypes = await prisma.productCategoryTypes.findMany();
      const orders = await prisma.orders.findMany();
      const orderDetails = await prisma.orderDetails.findMany();
      const customers = await prisma.user.findMany({ where: { role: "User" } });
      const orderConfirms = await prisma.orderConfirm.findMany({
        where: { userId: userFromDb.id },
      });
      return NextResponse.json(
        {
          boards,
          user: userFromDb,
          staffAndAdmins,
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
          customers,
          orderConfirms,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "User Doesnt Exist" },
        { status: 404 }
      );
    }
  }
}
