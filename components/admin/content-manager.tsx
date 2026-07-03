"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { deleteContent } from "@/lib/firestore/client-content";
import { ContentType } from "@/lib/firestore/types";
import { ContentList } from "./content-list";

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
          <h1 className="text-2xl font-semibold text-stone-800 tracking-wide">{title}</h1>
          <p className="text-sm text-stone-500 font-light mt-1">Всего записей: {items.length}</p>
        </div>
        
        <Link
          href={createLink}
          className="bg-[#1A3326] hover:bg-[#234433] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          Добавить
        </Link>
      </div>

      <ContentList 
        items={items} 
        contentType={contentType} 
        onDelete={handleDelete} 
      />

    </div>
  );
}