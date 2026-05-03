import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { topicSchema } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  const topics = await prisma.topic.findMany({
    where: { userId: session?.user?.email! },
  });

  return NextResponse.json(topics);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();

  const parsed = topicSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error },
      { status: 400 }
    );
  }

  const topic = await prisma.topic.create({
    data: {
      ...parsed.data,
      userId: session?.user?.email!,
    },
  });

  return NextResponse.json(topic);
}