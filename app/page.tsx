"use client";

import { useEffect, useState } from "react";
import TopicForm from "@/components/TopicForm";
import TopicCard from "@/components/TopicCard";

export default function Dashboard() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch("/api/topics")
      .then(res => res.json())
      .then(setTopics);
  }, []);

  const handleAdd = (newTopic: any) => {
    setTopics(prev => [newTopic, ...prev]);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/topics/${id}`, {
      method: "DELETE",
    });

    setTopics(prev =>
      prev.filter((t: any) => t.id !== id)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Dashboard
      </h2>

      <TopicForm onAdd={handleAdd} />

      <div className="grid gap-4">
        {topics.map((t: any) => (
          <TopicCard
            key={t.id}
            topic={t}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}