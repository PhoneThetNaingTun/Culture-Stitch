"use server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { productId, image, colorId } = await req.json();
  if (!productId || !image || !colorId) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  const isExistProduct = await prisma.productColors.findFirst({
    where: { productId },
  });
  if (isExistProduct) {
    const isExistColor = await prisma.productColors.findFirst({
      where: { colorId, productId },
    });
    if (isExistColor) {
      return NextResponse.json(
        {
          error: "This product with this color already exist!",
        },
        { status: 400 }
      );
    }
  }
  const newProductColor = await prisma.productColors.create({
    data: { productId, image, colorId },
  });
  return NextResponse.json(
    { message: "Product Color Detail created successfully", newProductColor },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest) {
  const { id, productId, image, colorId } = await req.json();

  if (!id || !productId || !image || !colorId) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const isExist = await prisma.productColors.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json(
      { error: "Product Color detail doesn't exist!" },
      { status: 404 }
    );
  } else {
    const isExistColor = await prisma.productColors.findFirst({
      where: { colorId, productId, NOT: { id } },
    });
    if (isExistColor) {
      const filePath = path.join(process.cwd(), "public", "products", image);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);

          return NextResponse.json(
            {
              error: "This product with this color already exist!",
            },
            { status: 400 }
          );
        } else {
          return NextResponse.json(
            { error: "File not found" },
            { status: 404 }
          );
        }
      } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json(
          { error: "Failed to delete file" },
          { status: 500 }
        );
      }
    }
  }

  // Handle image update
  if (isExist.image !== image) {
    const oldImagePath = path.join(
      process.cwd(),
      "public",
      "products",
      isExist.image
    );
    try {
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      return NextResponse.json(
        { error: "Failed to update file" },
        { status: 500 }
      );
    }
  }

  // Update the board
  try {
    const updatedProductColor = await prisma.productColors.update({
      where: { id },
      data: { image, productId, colorId },
    });
    return NextResponse.json(
      {
        message: "Product Color Detail updated successfully!",
        updatedProductColor,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating Product Color Detail:", error);
    return NextResponse.json(
      { error: "Failed to update Product Color Detail" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const isExist = await prisma.productColors.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json(
      { error: "Product Color Detail doesn't Exist" },
      { status: 404 }
    );
  }
  const productColorUsed = await prisma.productSizeColors.findFirst({
    where: { productColorId: id },
  });
  if (productColorUsed) {
    return NextResponse.json(
      {
        error:
          "This product color is connected to other. Please delete  product size first!",
      },
      { status: 400 }
    );
  }
  const filePath = path.join(
    process.cwd(),
    "public",
    "products",
    isExist.image as string
  );
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      await prisma.productColors.delete({ where: { id } });
      return NextResponse.json(
        {
          message: "Product Color Details deleted successfully!",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
