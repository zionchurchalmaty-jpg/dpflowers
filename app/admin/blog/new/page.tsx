import { Metadata } from "next";
import { ContentForm } from "@/components/admin/content-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Создание статьи | Админка",
};

export default function NewBlogPostPage() {
  return (
<div className="bg-[#FCF9F5] min-h-screen text-stone-800 p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <Link 
          href="/admin/blog" 
          className="p-2 rounded-full hover:bg-[#F4EFEA] text-stone-500 hover:text-[#1A3326] transition-colors"
          title="Назад к списку"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold text-stone-900">Новая статья</h1>
      </div>
      <ContentForm contentType="blog" />
    </div>
  );
}