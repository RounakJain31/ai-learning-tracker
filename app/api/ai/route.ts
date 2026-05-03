import { getOpenAI } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    const openai = getOpenAI(); // ✅ inside function

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Give learning suggestions for: ${content}`,
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