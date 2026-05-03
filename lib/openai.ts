import OpenAI from "openai";

export const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API Key");
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};