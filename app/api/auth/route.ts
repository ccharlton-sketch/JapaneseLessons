import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "japanese-learnings-dev-secret"
);

async function makeToken(userId: string) {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(secret);
}

function cookieOpts(token: string) {
  return {
    name: "jp_auth",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  };
}

export async function POST(req: NextRequest) {
  const { action, email, password } = await req.json();

  if (action === "signup") {
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed } });
    const token = await makeToken(user.id);
    const res = NextResponse.json({ user: { id: user.id, email: user.email } });
    res.cookies.set(cookieOpts(token));
    return res;
  }

  if (action === "signin") {
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const token = await makeToken(user.id);
    const res = NextResponse.json({ user: { id: user.id, email: user.email } });
    res.cookies.set(cookieOpts(token));
    return res;
  }

  if (action === "signout") {
    const res = NextResponse.json({ ok: true });
    res.cookies.set({ name: "jp_auth", value: "", maxAge: 0, path: "/" });
    return res;
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("jp_auth")?.value;
  if (!token) return NextResponse.json({ user: null });
  try {
    const { payload } = await jwtVerify(token, secret);
    const user = await prisma.user.findUnique({ where: { id: payload.sub as string } });
    if (!user) return NextResponse.json({ user: null });
    return NextResponse.json({ user: { id: user.id, email: user.email } });
  } catch {
    return NextResponse.json({ user: null });
  }
}
