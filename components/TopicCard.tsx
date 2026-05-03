"use client";

import { useState } from "react";

interface Topic {
  id: string;
  title: string;
  content: string;
}

export default function TopicCard({
  topic,
  onDelete,
}: {
  topic: Topic;
  onDelete: (id: string) => void;
}) {
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const handleAI = async () => {
    try {
      setLoadingAI(true);

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: topic.content,
        }),
      });

      const data = await res.json();
      setAiResult(data.result);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
      <h3 className="text-lg font-semibold mb-2">
        {topic.title}
      </h3>

      <p className="text-gray-600 mb-3">
        {topic.content}
      </p>

      <div className="flex gap-3 items-center">
        <button
          onClick={() => onDelete(topic.id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>

        <button
          onClick={handleAI}
          className="text-blue-500 hover:underline"
        >
          {loadingAI ? "Generating..." : "AI Suggestion"}
        </button>
      </div>

      {/* AI Result */}
      {aiResult && (
        <div className="mt-3 p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-800">
            🤖 {aiResult}
          </p>
        </div>
      )}
    </div>
  );
}