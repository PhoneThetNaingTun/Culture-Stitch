"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { type } = await req.json();
  if (!type) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  const newType = await prisma.types.create({
    data: { type },
  });
  return NextResponse.json(
    {
      message: "Product Type Created Successfully",
      newType,
    },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest) {
  const { id, type } = await req.json();
  if (!id || !type) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  const isExist = await prisma.types.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Type Doesn't Exist!" }, { status: 404 });
  }
  const updatedType = await prisma.types.update({
    where: { id },
    data: { type },
  });
  return NextResponse.json(
    {
      message: "Product Type Updated Successfully",
      updatedType,
    },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const isExist = await prisma.types.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Type Doesn't Exist!" }, { status: 404 });
  }
  const typeUsed = await prisma.products.findFirst({
    where: { typeId: id },
  });
  if (typeUsed) {
    return NextResponse.json(
      {
        error:
          "This Type is connected to other Products. Please delete Product  first!",
      },
      { status: 400 }
    );
  }
  try {
    await prisma.types.delete({ where: { id } });
    return NextResponse.json(
      {
        message: "Type Deleted Successfully",
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
