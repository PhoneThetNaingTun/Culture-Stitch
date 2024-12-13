"use server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { name, productCategoryId, typeId, image, isFeatured, price } =
    await req.json();
  if (!name || !productCategoryId || !typeId || !image || !price) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  const newProduct = await prisma.products.create({
    data: { name, productCategoryId, typeId, image, isFeatured, price },
  });
  return NextResponse.json(
    { message: "Product created successfully", newProduct },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest) {
  const { id, name, productCategoryId, typeId, image, isFeatured, price } =
    await req.json();

  // Validate request
  if (!id || !name || !productCategoryId || !typeId || !image || !price) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }

  // Check if the board exists
  const isExist = await prisma.products.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json(
      { error: "Product doesn't exist!" },
      { status: 404 }
    );
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
    const updatedProduct = await prisma.products.update({
      where: { id },
      data: { name, productCategoryId, typeId, image, isFeatured, price },
    });
    return NextResponse.json(
      { message: "Product updated successfully!", updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const isExist = await prisma.products.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json(
      { error: "Product doesn't Exist" },
      { status: 404 }
    );
  }
  const productUsed = await prisma.productColors.findFirst({
    where: { productId: id },
  });
  if (productUsed) {
    return NextResponse.json(
      {
        error:
          "This product is connected to other. Please delete Product Color / product size first!",
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
      await prisma.products.delete({ where: { id } });
      return NextResponse.json(
        {
          message: "Product deleted successfully!",
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
