"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, review } = await req.json();

  if (!userId || !review) {
    return NextResponse.json({ error: "Bad Request!" }, { status: 400 });
  }
  await prisma.reviews.create({ data: { userId, review } });
  return NextResponse.json({ message: "Review Given!" });
}
