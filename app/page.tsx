"use client";

import { useEffect, useState } from "react";
import TopicForm from "@/components/TopicForm";
import TopicCard from "@/components/TopicCard";

// ✅ Define type
type Topic = {
  id: string;
  title: string;
  content: string;
};

export default function Dashboard() {
  // ✅ FIX: explicitly type state
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  // 📦 Fetch topics
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("/api/topics");
        const data = await res.json();
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // ➕ Add topic
  const handleAdd = (newTopic: Topic) => {
    setTopics(prev => [newTopic, ...prev]);
  };

  // ❌ Delete topic
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/topics/${id}`, {
        method: "DELETE",
      });

      setTopics(prev =>
        prev.filter(topic => topic.id !== id)
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ⏳ Loading UI
  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Dashboard
      </h2>

      <TopicForm onAdd={handleAdd} />

      {topics.length === 0 ? (
        <p className="text-gray-500 mt-4">
          No topics yet.
        </p>
      ) : (
        <div className="grid gap-4 mt-4">
          {topics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}