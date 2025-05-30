import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const formData = await req.json();

  await prisma.skill.create({
    data: {
      name: formData.name as string,
      description: formData.description as string,
      image: formData.image as string,
    }
  });

  return NextResponse.json({ success: true });
}
