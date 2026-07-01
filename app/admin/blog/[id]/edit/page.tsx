import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getContentById } from "@/lib/firestore/client-content";
import { ContentForm } from "@/components/admin/content-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  
  const rawPost = await getContentById(id, "blog", true);

  if (!rawPost) {
    redirect("/admin/blog");
  }

  const serializedPost = JSON.parse(JSON.stringify({
    ...rawPost,
    date: (rawPost.date as any)?.toDate ? (rawPost.date as any).toDate().toISOString() : rawPost.date,
    createdAt: (rawPost.createdAt as any)?.toDate ? (rawPost.createdAt as any).toDate().toISOString() : rawPost.createdAt,
    updatedAt: (rawPost.updatedAt as any)?.toDate ? (rawPost.updatedAt as any).toDate().toISOString() : rawPost.updatedAt,
  }));

  return (
<div className="bg-[#FCF9F5] min-h-screen text-stone-800 p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <Link 
          href="/admin/blog" 
          className="p-2 rounded-full hover:bg-[#F4EFEA] text-stone-500 hover:text-[#1A3326] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold text-stone-900">Редактировать статью</h1>
      </div>

        contentType="blog"
        initialData={{
          ...serializedPost,
          tags: serializedPost.tags ?? [],
          seo: serializedPost.seo ?? {
            metaTitle: "",
            metaDescription: "",
            ogImage: "",
            canonicalUrl: "",
            noIndex: false,
          },
        }}
        isEditing
      />
    </div>
  );
}