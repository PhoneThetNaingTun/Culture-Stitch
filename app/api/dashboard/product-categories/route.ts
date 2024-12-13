"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { categoryName, categoryTypeId } = await req.json();
  if (!categoryName || !categoryTypeId) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  const newProdcutCategory = await prisma.productCategories.create({
    data: { categoryName, categoryTypeId },
  });
  return NextResponse.json(
    {
      message: "Product Category Created Successfully",
      newProdcutCategory,
    },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest) {
  const { id, categoryName, categoryTypeId } = await req.json();
  if (!id || !categoryName || !categoryTypeId) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  const isExist = await prisma.productCategories.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json(
      { error: "Product Category Doesn't Exist!" },
      { status: 404 }
    );
  }
  const updatedProductCategory = await prisma.productCategories.update({
    where: { id },
    data: { categoryName, categoryTypeId },
  });
  return NextResponse.json(
    {
      message: "Product Category Updated Successfully",
      updatedProductCategory,
    },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const isExist = await prisma.productCategories.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json(
      { error: "Product Category Doesn't Exist!" },
      { status: 404 }
    );
  }

  const categoryUsed = await prisma.products.findFirst({
    where: { productCategoryId: id },
  });
  if (categoryUsed) {
    return NextResponse.json(
      {
        error:
          "This Category is connected to other Products. Please delete those Products first!",
      },
      { status: 400 }
    );
  }
  try {
    await prisma.productCategories.delete({ where: { id } });
    return NextResponse.json(
      {
        message: "Product Category Deleted Successfully",
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
