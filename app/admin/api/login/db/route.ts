import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Crypto from "crypto";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const deger = Crypto.createHash("sha256");
  deger.update("adminBasarili");
  const adminToken = deger.digest("hex");
  const body = await request.json();
  const { email, name, pswd } = body;

  const user = await prisma.adminLogs.create({
    data: {
      logName: "Admin Login",
      email: email,
      name:name,
      date: new Date()
    },
  });
  
  const hash = Crypto.createHash("sha256");
  hash.update(pswd);
  const password = hash.digest("hex");
  const secret = process.env.adminPswd;
  if (secret === undefined) {
    throw new Error('SECRET_KEY environment variable is not set');
  }
  const secretHash = Crypto.createHash("sha256");
  secretHash.update(secret);
  const secretPassword = secretHash.digest("hex");

  if (password !== secretPassword) {
    cookieStore.delete('admin-token');
    return NextResponse.json({ error: "Wrong password" , success: false});
  }else{
    await prisma.adminLogs.update({
      where: {
        id: user.id,
      },
      data: {
        isLogin: true,
      },
    });


     cookieStore.set('admin-token', adminToken, {
      httpOnly: true,  // JavaScript erişemez — güvenlik için önemli
      secure: true,    // HTTPS'te çalışır
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 1 // 7 gün
    });
    return NextResponse.json({ success: "Login successful" });
  }
}
