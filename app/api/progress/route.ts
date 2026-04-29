import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ data: null }, { status: 401 });
  const record = await prisma.userProgress.findUnique({ where: { userId: session.user.id } });
  return NextResponse.json({ data: record ? JSON.parse(record.data) : null });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data } = await req.json();
  await prisma.userProgress.upsert({
    where: { userId: session.user.id },
    update: { data: JSON.stringify(data) },
    create: { userId: session.user.id, data: JSON.stringify(data) },
  });
  return NextResponse.json({ ok: true });
}
