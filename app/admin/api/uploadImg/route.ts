import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary yapılandırması
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { fileBuffer, fileName, fileType } = await req.json();

    if (!fileBuffer || !fileName || !fileType) {
      return NextResponse.json({ error: "Eksik veri" }, { status: 400 });
    }

    const buffer = Buffer.from(fileBuffer.data);

    // Cloudinary'e base64 olarak gönder
    const base64Image = `data:${fileType};base64,${buffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "skillsUploads", // Cloudinary klasörü
      public_id: fileName.split(".")[0], // Dosya adını uzantısız olarak kullan
    });

    return NextResponse.json({ fileUrl: uploadResponse.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json({ error: "Cloudinary'e yüklenemedi" }, { status: 500 });
  }
}
