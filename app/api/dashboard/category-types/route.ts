"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { categroyTypeName } = await req.json();
  if (!categroyTypeName) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  const newCategoryType = await prisma.productCategoryTypes.create({
    data: { categroyTypeName },
  });
  return NextResponse.json(
    {
      message: "Product Category Type Created Successfully",
      newCategoryType,
    },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest) {
  const { id, categroyTypeName } = await req.json();
  if (!id || !categroyTypeName) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  const isExist = await prisma.productCategoryTypes.findFirst({
    where: { id },
  });
  if (!isExist) {
    return NextResponse.json(
      { error: "Product Category Type Doesn't Exist!" },
      { status: 404 }
    );
  }
  const updatedCategoryType = await prisma.productCategoryTypes.update({
    where: { id },
    data: { categroyTypeName },
  });
  return NextResponse.json(
    {
      message: "Product Category Type Updated Successfully",
      updatedCategoryType,
    },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const isExist = await prisma.productCategoryTypes.findFirst({
    where: { id },
  });
  if (!isExist) {
    return NextResponse.json(
      { error: "Product Category Type Doesn't Exist!" },
      { status: 404 }
    );
  }

  const categoryTypeUsed = await prisma.productCategories.findFirst({
    where: { categoryTypeId: id },
  });
  if (categoryTypeUsed) {
    return NextResponse.json(
      {
        error:
          "This Category  Type is connected to other Categories. Please delete those Categories first!",
      },
      { status: 400 }
    );
  }
  try {
    await prisma.productCategoryTypes.delete({ where: { id } });
    return NextResponse.json(
      {
        message: "Product Category Type Deleted Successfully",
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
