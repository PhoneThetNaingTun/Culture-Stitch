"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { color } = await req.json();
  if (!color) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }

  const colorExist = await prisma.colors.findFirst({
    where: { color: color as string },
  });
  if (colorExist) {
    return NextResponse.json(
      { error: "This Color Already Exist!" },
      { status: 409 }
    );
  }
  const newColor = await prisma.colors.create({
    data: { color },
  });
  return NextResponse.json(
    {
      message: "Color Created Successfully",
      newColor,
    },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest) {
  const { id, color } = await req.json();
  if (!id || !color) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  const isExist = await prisma.colors.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json(
      { error: "Color Doesn't Exist!" },
      { status: 404 }
    );
  }
  const updatedColor = await prisma.colors.update({
    where: { id },
    data: { color },
  });
  return NextResponse.json(
    {
      message: "Color Updated Successfully",
      updatedColor,
    },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const isExist = await prisma.colors.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json(
      { error: "Color Doesn't Exist!" },
      { status: 404 }
    );
  }
  const colorUsed = await prisma.productColors.findFirst({
    where: { colorId: id },
  });
  if (colorUsed) {
    return NextResponse.json(
      {
        error:
          "This Color is connected to other Products. Please delete  Product color/ product size first!",
      },
      { status: 400 }
    );
  }
  try {
    await prisma.colors.delete({ where: { id } });
    return NextResponse.json(
      {
        message: "Color Deleted Successfully",
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
