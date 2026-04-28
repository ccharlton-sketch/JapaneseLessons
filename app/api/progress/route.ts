import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/db";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "japanese-learnings-dev-secret"
);

async function getUserId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("jp_auth")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.sub as string;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ data: null }, { status: 401 });
  const record = await prisma.userProgress.findUnique({ where: { userId } });
  return NextResponse.json({ data: record ? JSON.parse(record.data) : null });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data } = await req.json();
  await prisma.userProgress.upsert({
    where: { userId },
    update: { data: JSON.stringify(data) },
    create: { userId, data: JSON.stringify(data) },
  });
  return NextResponse.json({ ok: true });
}
