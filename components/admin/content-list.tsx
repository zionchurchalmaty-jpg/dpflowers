"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Pencil, Trash2, CheckCircle2, CircleDashed, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentType } from "@/lib/firestore/types";

interface ContentListProps {
  items: any[];
  contentType: ContentType;
  onDelete?: (id: string) => void;
}

const formatDate = (val: any) => {
  if (!val) return { date: "—", time: "" };
  
  const d = new Date(val);

  if (isNaN(d.getTime())) return { date: "—", time: "" };

  return {
    date: d.toLocaleDateString("ru-RU"),
    time: d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
  };
};

export function ContentList({ items, contentType, onDelete }: ContentListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const config: Record<string, { basePath: string; publicPath: string; label: string; meta: string }> = {
    content: { basePath: "/admin/content", publicPath: "/blog", label: "Запись", meta: "Теги" },
    projects: { basePath: "/admin/projects", publicPath: "/projects", label: "Проект", meta: "Локация/Площадь" },
  };

  const currentConfig = config[contentType as string] || { basePath: "#", publicPath: "", label: "Запись", meta: "Инфо" };

  const filteredItems = items.filter((item: any) => {
    const s = search.toLowerCase();
    return (item.title || "").toLowerCase().includes(s) || (item.excerpt || "").toLowerCase().includes(s);
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
          <button onClick={() => setStatusFilter("all")} className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-all", statusFilter === "all" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700")}>
            Все
          </button>
          <button onClick={() => setStatusFilter("published")} className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-1.5", statusFilter === "published" ? "bg-white shadow-sm text-green-600" : "text-gray-500 hover:text-gray-700")}>
            <CheckCircle2 className="w-4 h-4" /> Публикации
          </button>
          <button onClick={() => setStatusFilter("draft")} className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-1.5", statusFilter === "draft" ? "bg-white shadow-sm text-orange-600" : "text-gray-500 hover:text-gray-700")}>
            <CircleDashed className="w-4 h-4" /> Черновики
          </button>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f99c00] focus:ring-1 focus:ring-[#f99c00] transition-all bg-white"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase text-gray-500 font-extrabold tracking-wider">
            <tr>
              <th className="px-6 py-4">{currentConfig.label}</th>
              <th className="px-6 py-4">{currentConfig.meta}</th>
              <th className="px-6 py-4">Дата</th>
              <th className="px-6 py-4 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredItems.map((item: any) => {
              if (statusFilter !== "all" && item.status !== statusFilter) return null;
              
              const { date, time } = formatDate(item.date || item.createdAt);

              return (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <div className="font-bold text-gray-900 flex items-center gap-2 mb-1 text-[15px]">
                      {item.title}
                      {item.isSeo && <span className="px-2 py-0.5 bg-[#fff3e0] text-[#f99c00] text-[10px] font-black rounded-sm uppercase tracking-wider">SEO</span>}
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-1">{item.excerpt}</div>
                  </td>
                  <td className="px-6 py-4 align-top text-gray-600 max-w-[200px]">
                    <div className="text-xs">
                      {contentType === "projects" && (
                        <span className="font-medium">{item.location || item.area || "—"}</span>
                      )}
                      {contentType === "content" && (
                        item.tags && item.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((t: string, idx: number) => (
                              <span key={idx} className="bg-gray-100 border border-gray-200 text-gray-600 px-2 py-1 rounded-sm text-[10px] uppercase font-bold tracking-wider">
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top whitespace-nowrap">
                    <div className="text-gray-900 font-bold">{date}</div>
                    <div className="text-xs text-gray-400 font-medium">{time}</div>
                  </td>
                  <td className="px-6 py-4 align-top text-right">
                    <div className="flex justify-end gap-1.5">
                      {item.slug && item.status === "published" && (
                        <a href={`/${item.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-[#f99c00] hover:bg-[#fff3e0] rounded-lg transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <Link href={`${currentConfig.basePath}/${item.id}/edit`} className="p-2 text-gray-400 hover:text-[#f99c00] hover:bg-[#fff3e0] rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      {onDelete && (
                        <button onClick={() => onDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredItems.length === 0 && <div className="p-10 text-center text-gray-500 text-sm font-medium">Ничего не найдено</div>}
      </div>
    </div>
  );
}