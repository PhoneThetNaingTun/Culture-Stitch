"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { size } = await req.json();
  if (!size) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  const newSize = await prisma.sizes.create({
    data: { size },
  });
  return NextResponse.json(
    {
      message: "Product Size Created Successfully",
      newSize,
    },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest) {
  const { id, size } = await req.json();
  if (!id || !size) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  const isExist = await prisma.sizes.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Size Doesn't Exist!" }, { status: 404 });
  }
  const updatedSize = await prisma.sizes.update({
    where: { id },
    data: { size },
  });
  return NextResponse.json(
    {
      message: "Product Size Updated Successfully",
      updatedSize,
    },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const isExist = await prisma.sizes.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Size Doesn't Exist!" }, { status: 404 });
  }
  const sizeUsed = await prisma.productSizeColors.findFirst({
    where: { sizeId: id },
  });
  if (sizeUsed) {
    return NextResponse.json(
      {
        error:
          "This Size is connected to other Products. Please delete Product size first!",
      },
      { status: 400 }
    );
  }
  try {
    await prisma.sizes.delete({ where: { id } });
    return NextResponse.json(
      {
        message: "Size Deleted Successfully",
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
