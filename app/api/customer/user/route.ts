"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, name, email, phone, address } = await req.json();
  if (!id || !name || !email || !phone || !address) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
  const isExist = await prisma.user.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "User doesn't exist!" }, { status: 404 });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { name, email, phone, address },
  });
  return NextResponse.json(
    { message: "Updated Successfully", user },
    { status: 200 }
  );
}
