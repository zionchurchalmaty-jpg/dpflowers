import { getAdminContent } from "@/lib/firestore/client-content";
import { ContentManager } from "@/components/admin/content-manager";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Управление записями | Админка",
};

export const revalidate = 0;

export default async function AdminContentPage() {
  const articles = await getAdminContent("content");

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] font-sans p-6 md:p-10">
      <ContentManager 
        initialItems={articles}
        contentType="content" 
        title="Управление записями (Блог / SEO)"
        createLink="/admin/content/new"
      />
    </div>
  );
}