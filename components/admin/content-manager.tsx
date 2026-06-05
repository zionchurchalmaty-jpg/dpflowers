"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ContentList } from "./content-list";
import { deleteContent } from "@/lib/firestore/client-content";
import { ContentType } from "@/lib/firestore/types";

interface ContentManagerProps {
  initialItems: any[];
  contentType: ContentType;
  title: string;
  createLink: string;
}

export function ContentManager({
  initialItems,
  contentType,
  title,
  createLink,
}: ContentManagerProps) {
  const [items, setItems] = useState(initialItems);

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот материал?")) return;

    try {
      await deleteContent(id, contentType);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Не удалось удалить элемент.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Всего записей: {items.length}</p>
        </div>
        
        <Link
          href={createLink}
          className="bg-[#f99c00] hover:bg-[#e08c00] text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Добавить
        </Link>
      </div>
      
      <ContentList items={items} contentType={contentType} onDelete={handleDelete} />
    </div>
  );
}