import React from "react";
import Link from "next/link";
import { 
  getDashboardStatsAdmin, 
  getAdminContentAdmin, 
  getLeadsAdmin
} from "@/lib/firestore/admin-content";
import { StatCard } from "@/components/admin/stat-card";
import { FileText, FolderOpen } from "lucide-react";
import { LeadsList } from "@/components/admin/lead-list";

export const metadata = { title: "Обзор | Админ-панель VT STROY" };

export default async function AdminDashboardPage() {
  const stats = await getDashboardStatsAdmin();
  const projectsRaw = await getAdminContentAdmin("projects");
  const leads = await getLeadsAdmin(5);

  const projects = projectsRaw as any[];

  return (
    <div className="space-y-8 p-6 md:p-8 bg-[#F8F9FA] min-h-screen">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Обзор</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/projects" className="block group">
          <StatCard title="Портфолио (Объекты)" value={stats.projectsCount} icon={FolderOpen} />
        </Link>
        <Link href="/admin/content" className="block group">
          <StatCard title="Записи (Блог / SEO)" value={stats.contentCount} icon={FileText} />
        </Link>
      </div>
      <div className="max-w-2xl">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Последние заявки</h2>
        <LeadsList leads={leads} />
      </div>

    </div>
  );
}