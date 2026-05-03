"use client";

import { useState } from "react";

export default function TopicForm({ onAdd }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!title || !content) return;

    const res = await fetch("/api/topics", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        userId: "demo-user",
      }),
    });

    const data = await res.json();
    onAdd(data);

    setTitle("");
    setContent("");
  };

  return (
    <div className="mb-6">
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Add Topic
      </button>
    </div>
  );
}