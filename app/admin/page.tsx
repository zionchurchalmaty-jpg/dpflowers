import Link from "next/link";
import { getDashboardStatsAdmin, getLeadsAdmin } from "@/lib/firestore/admin-content";
import { StatCard } from "@/components/admin/stat-card";
import { Flower2, Layers } from "lucide-react";

export const metadata = { title: "Обзор | DPFlowers Admin" };

export default async function AdminDashboardPage() {
  const stats = await getDashboardStatsAdmin(); 
  const leads = await getLeadsAdmin(5);

  return (
    <div className="space-y-8 p-6 md:p-8 min-h-screen font-sans">
      <h1 className="text-2xl font-semibold text-stone-800">Обзор магазина</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/products" className="block group">
          <StatCard title="Товары (Букеты)" value={stats.productsCount || 0} icon={Flower2} />
        </Link>
        <Link href="/admin/sections" className="block group">
          <StatCard title="Активные секции" value={stats.sectionsCount || 0} icon={Layers} />
        </Link>
      </div>

      <div className="max-w-3xl">
        {/* <h2 className="text-lg font-semibold text-stone-800 mb-4">Новые заявки и заказы</h2> */}
      </div>
    </div>
  );
}