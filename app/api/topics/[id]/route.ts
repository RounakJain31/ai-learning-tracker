import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
  const body = await req.json();

  const updated = await prisma.topic.update({
    where: { id: params.id },
    data: body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: any) {
  await prisma.topic.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Deleted" });
}