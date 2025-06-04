import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const formData = await req.json();

  await prisma.contact.create({
    data: {
      name: formData.name as string,
      email: formData.email as string,
      phone: formData.phone as string,
      message: formData.message as string,
    }
  });

  return NextResponse.json({ success: true });
}
