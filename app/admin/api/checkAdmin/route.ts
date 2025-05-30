import { NextRequest, NextResponse } from 'next/server';
import Crypto from 'crypto';

function verifyToken(token: string) {
  const deger = Crypto.createHash('sha256');
  deger.update('adminBasarili');
  const adminToken = deger.digest('hex');
  return token === adminToken;
}

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie');

  if (!cookieHeader) {
    return NextResponse.json({ authorized: false }, { status: 401 });
  }

  // Basit cookie parse:
  // cookie string: 'name=value; admin-token=xxx; another=yyy'
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(cookie => {
      const [name, ...rest] = cookie.trim().split('=');
      return [name, rest.join('=')];
    })
  );

  const token = cookies['admin-token'];

  if (!token) {
    return NextResponse.json({ authorized: false }, { status: 200 });
  }

  const isValid = verifyToken(token);

  if (!isValid) {
    return NextResponse.json({ authorized: false }, { status: 403 });
  }

  return NextResponse.json({ authorized: true });
}
