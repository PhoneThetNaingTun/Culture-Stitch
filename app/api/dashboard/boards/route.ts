"use server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { label, image, userId } = await req.json();
  if (!label || !image || !userId) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  const newBoard = await prisma.board.create({
    data: { label, image, userId },
  });
  return NextResponse.json(
    { message: "Board created successfully", newBoard },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest) {
  const { id, label, image, userId, onDisplay } = await req.json();

  // Validate request
  if (!id || !label || !image || !userId) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }

  // Check if the board exists
  const existingBoard = await prisma.board.findFirst({ where: { id } });
  if (!existingBoard) {
    return NextResponse.json(
      { error: "Board doesn't exist!" },
      { status: 404 }
    );
  }
  if (!onDisplay) {
    const displayBoard = await prisma.board.findFirst({
      where: { onDisplay: true, NOT: { id } },
    });
    if (!displayBoard) {
      return NextResponse.json(
        { error: "You have to have at least 1 on display board!" },
        { status: 400 }
      );
    }
  } else {
    await prisma.board.updateMany({
      data: { onDisplay: false },
      where: { onDisplay: true },
    });
  }

  // Handle image update
  if (existingBoard.image !== image) {
    const oldImagePath = path.join(
      process.cwd(),
      "public",
      "boards",
      existingBoard.image
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
    const updatedBoard = await prisma.board.update({
      where: { id },
      data: { label, image, userId, onDisplay },
    });
    const boards = await prisma.board.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(
      { message: "Board updated successfully!", updatedBoard, boards },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating board:", error);
    return NextResponse.json(
      { error: "Failed to update board" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const isExist = await prisma.board.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Board doesn't Exist" }, { status: 404 });
  }
  if (isExist.onDisplay) {
    return NextResponse.json(
      { error: "You cannot delete on display board!" },
      { status: 400 }
    );
  }
  const filePath = path.join(
    process.cwd(),
    "public",
    "boards",
    isExist.image as string
  );
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      await prisma.board.delete({ where: { id } });
      return NextResponse.json(
        {
          message: "Board deleted successfully!",
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
