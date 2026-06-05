import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow h-full relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#fff3e0] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
          <h3 className="text-4xl font-extrabold text-gray-900 mt-2">{value}</h3>
        </div>
        <div className="p-3.5 rounded-xl bg-[#fff3e0] text-[#f99c00] group-hover:bg-[#f99c00] group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}