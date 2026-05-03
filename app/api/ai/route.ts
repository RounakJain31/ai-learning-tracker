import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content required" },
        { status: 400 }
      );
    }

    const response =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Give actionable learning suggestions for: ${content}`,
          },
        ],
      });

    return NextResponse.json({
      result: response.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "AI failed" },
      { status: 500 }
    );
  }
}