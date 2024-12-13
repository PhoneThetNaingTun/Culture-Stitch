"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { productColorId, sizeId, quantity } = await req.json();
  if (!productColorId || !sizeId || quantity < 0) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  const isExistSize = await prisma.productSizeColors.findFirst({
    where: { sizeId, productColorId },
  });
  if (isExistSize) {
    return NextResponse.json(
      {
        error: "This product with this size already exist!",
      },
      { status: 400 }
    );
  }
  const newProductSizeColor = await prisma.productSizeColors.create({
    data: { productColorId, sizeId, quantity },
  });
  return NextResponse.json(
    {
      message: "Product Size/Quantity Created Successfully",
      newProductSizeColor,
    },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest) {
  const { id, productColorId, sizeId, quantity } = await req.json();
  if (!id || !productColorId || !sizeId || quantity < 0) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  const isExist = await prisma.productSizeColors.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json(
      { error: "Product Size/Quantity Doesn't Exist!" },
      { status: 404 }
    );
  } else {
    const isExistSize = await prisma.productSizeColors.findFirst({
      where: { sizeId, productColorId, NOT: { id } },
    });
    if (isExistSize) {
      return NextResponse.json(
        {
          error: "This product with this size already exist!",
        },
        { status: 400 }
      );
    }
  }
  const updatedProductSizeColor = await prisma.productSizeColors.update({
    where: { id },
    data: { productColorId, sizeId, quantity },
  });
  return NextResponse.json(
    {
      message: "Product Size/Quantity Updated Successfully",
      updatedProductSizeColor,
    },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const isExist = await prisma.productSizeColors.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json(
      { error: "Product Size/Quantity Doesn't Exist!" },
      { status: 404 }
    );
  }
  try {
    await prisma.productSizeColors.delete({ where: { id } });
    return NextResponse.json(
      {
        message: "Product Size/Quantity Deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "fail to delete",
      },
      { status: 500 }
    );
  }
}
