"use client";

import { useEffect, useState } from "react";
import TopicForm from "@/components/TopicForm";
import TopicCard from "@/components/TopicCard";

interface Topic {
  id: string;
  title: string;
  content: string;
}

export default function Dashboard() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("/api/topics");
        const data = await res.json();
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false); // ✅ STOP LOADING HERE
      }
    };

    fetchTopics();
  }, []);

  // ➕ ADD TOPIC
  const handleAdd = (newTopic: Topic) => {
    setTopics(prev => [newTopic, ...prev]);
  };

  // ❌ DELETE TOPIC
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

  // 🔍 SEARCH FILTER
  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(search.toLowerCase())
  );

  // ⏳ LOADING UI (IMPORTANT)
  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Loading topics...
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Dashboard
      </h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search topics..."
        className="border p-2 mb-4 w-full rounded"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* ➕ FORM */}
      <TopicForm onAdd={handleAdd} />

      {/* 📦 LIST */}
      {filteredTopics.length === 0 ? (
        <p className="text-gray-500">
          No topics found.
        </p>
      ) : (
        <div className="grid gap-4">
          {filteredTopics.map(topic => (
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