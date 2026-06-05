"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Loader2, FolderOpen, MapPin } from "lucide-react";
import { getAdminContent, deleteContent } from "@/lib/firestore/client-content";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getAdminContent("projects");
      setProjects(data);
    } catch (error) {
      console.error("Ошибка при загрузке проектов:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Вы уверены, что хотите удалить этот объект? Это действие нельзя отменить.",
      )
    )
      return;

    try {
      await deleteContent(id, "projects");
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Не удалось удалить объект");
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6 md:p-8">
      <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#202124] flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-[#f99c00]" />
            Управление портфолио
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Добавляйте и редактируйте реализованные объекты на сайте
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="bg-[#f99c00] hover:bg-[#e08c00] text-gray-900 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить объект
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#f99c00]" />
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-[#fff3e0] rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-[#f99c00]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Нет добавленных объектов
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              Вы еще не добавили ни одного реализованного проекта в портфолио.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative h-48 w-full bg-gray-100">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title?.ru || "Фото"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Нет фото
                    </div>
                  )}
                  {project.status === "draft" && (
                    <div className="absolute top-3 right-3 bg-gray-800 text-white text-[11px] font-bold px-2 py-1 rounded-sm uppercase">
                      Черновик
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-900 leading-tight mb-3 line-clamp-2">
                    {project.title || "Без названия"}
                  </h3>

                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 text-[#f99c00]" />
                    {project.location || "Локация не указана"}
                  </div>

                  <div className="flex-grow" />

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100 mt-2">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#F8F9FA] hover:bg-[#fff3e0] hover:text-[#f99c00] text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Изменить
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="px-3 py-2 bg-[#F8F9FA] hover:bg-[#FCE8E6] text-[#D93025] rounded-lg transition-colors"
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
