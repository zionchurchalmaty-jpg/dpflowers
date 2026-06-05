import { Metadata } from "next";
import { ContentForm } from "@/components/admin/content-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Создание записи | Админка",
};

export default function NewContentPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen text-[#202124] p-6 md:p-8">
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <Link
          href="/admin/content"
          className="p-2 rounded-full hover:bg-[#fff3e0] text-[#5F6368] hover:text-[#f99c00] transition-colors"
          title="Назад к списку"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-medium text-[#202124]">Новая запись</h1>
        </div>
      </div>

      <ContentForm contentType="content" />
    </div>
  );
}
