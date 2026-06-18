"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Loader2, Layers, Eye, EyeOff, Hash } from "lucide-react";
import { getAdminContent, deleteContent } from "@/lib/firestore/client-content";

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      const data = await getAdminContent("sections");
      const sortedData = data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setSections(sortedData);
    } catch (error) {
      console.error("Ошибка при загрузке секций:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту категорию? Привязанные товары не удалятся, но перестанут отображаться в этом блоке.")) return;

    try {
      await deleteContent(id, "sections");
      setSections(sections.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Не удалось удалить категорию");
    }
  };

  return (
    <div className="bg-[#FCF9F5] min-h-screen p-6 md:p-8 font-sans">
      <div className="max-w-none mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-800 flex items-center gap-2 tracking-wide">
            <Layers className="w-6 h-6 text-[#1A3326]" />
            Категории витрины
          </h1>
          <p className="text-sm text-stone-500 mt-1 font-light">
            Управляйте разделами каталога и их порядком на главной странице
          </p>
        </div>

        <Link
          href="/admin/sections/new"
          className="bg-[#1A3326] hover:bg-[#234433] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          Добавить категорию
        </Link>
      </div>

      <div className="max-w-none">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#1A3326]" />
          </div>
        ) : sections.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center shadow-sm max-w-3xl">
            <div className="w-16 h-16 bg-[#F4EFEA] rounded-full flex items-center justify-center mx-auto mb-4">
              <Layers className="w-8 h-8 text-[#1A3326]" />
            </div>
            <h3 className="text-lg font-semibold text-stone-800 mb-2">
              Нет добавленных категорий
            </h3>
            <p className="text-stone-500 max-w-sm mx-auto mb-6 font-light">
              Создайте первую категорию (например, "Свадебные букеты"), чтобы группировать товары.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-video w-full bg-stone-100 overflow-hidden">
                  {section.image ? (
                    <Image
                      src={section.image}
                      alt={section.title || "Обложка"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm font-light">
                      Нет обложки
                    </div>
                  )}

                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-800 text-xs font-bold px-2 py-1.5 rounded-md shadow-sm flex items-center gap-1.5" title="Порядок вывода">
                    <Hash className="w-3 h-3 text-[#D4AF37]" />
                    {section.order || 0}
                  </div>

                  <div className="absolute top-3 right-3">
                    {section.isHomeDisplayed ? (
                      <span className="bg-[#1A3326]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1.5 rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                        <Eye className="w-3 h-3 text-[#D4AF37]" /> На главной
                      </span>
                    ) : (
                      <span className="bg-stone-800/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1.5 rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                        <EyeOff className="w-3 h-3 text-stone-400" /> Скрыта
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-semibold text-stone-900 text-lg leading-snug mb-1">
                    {section.title || "Без названия"}
                  </h3>
                  <p className="text-xs text-stone-400 font-light mb-4">
                    ID: <span className="font-mono text-[10px]">{section.slug || section.id}</span>
                  </p>

                  <div className="flex-grow" />

                  <div className="flex items-center gap-2 pt-4 border-t border-stone-100 mt-2">
                    <Link
                      href={`/admin/sections/${section.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-stone-50 hover:bg-[#F4EFEA] hover:text-[#1A3326] text-stone-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Изменить
                    </Link>
                    <button
                      onClick={() => handleDelete(section.id)}
                      className="px-3 py-2 bg-stone-50 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}