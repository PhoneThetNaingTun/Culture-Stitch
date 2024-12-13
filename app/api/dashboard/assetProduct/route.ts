"use server";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const uploadDir = path.join(process.cwd(), "public", "products");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newFileName = `${uniqueSuffix}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, newFileName);
    fs.writeFileSync(filePath, buffer);
    return NextResponse.json({
      message: "Uploaded Successfully",
      imageName: `${newFileName}`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Fail To Upload Image" });
  }
}
