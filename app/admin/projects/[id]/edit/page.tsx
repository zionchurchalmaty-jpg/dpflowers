import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getContentById, serializeFirebaseData } from "@/lib/firestore/client-content";
import { ProjectForm } from "@/components/admin/project-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;

  const rawProject = await getContentById(id, "projects", true);

  if (!rawProject) {
    redirect("/admin/projects");
  }

  const cleanProject = serializeFirebaseData(rawProject);

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6 md:p-8">
      <div className="max-w-4xl mx-auto mb-6 flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="p-2 rounded-full hover:bg-[#fff3e0] text-gray-500 hover:text-[#f99c00] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Редактирование объекта</h1>
      </div>

      <ProjectForm initialData={cleanProject} isEditing={true} />
    </div>
  );
}