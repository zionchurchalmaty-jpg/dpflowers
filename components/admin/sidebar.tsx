"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Flower2, Layers, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Дашборд" },
  { href: "/admin/products", icon: Flower2, label: "Товары" },
  { href: "/admin/sections", icon: Layers, label: "Секции витрины" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1A3326] text-white absolute hidden md:flex flex-col min-h-screen border-r border-[#234433]">
      <div className="h-16 flex items-center px-6 border-b border-[#234433]">
        <span className="text-[#D4AF37] font-serif font-bold text-xl tracking-widest uppercase">DPFlowers Admin</span>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = 
            item.href === "/admin" 
              ? pathname === "/admin"
              : pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-[#234433] text-[#D4AF37]" 
                  : "text-stone-300 hover:bg-[#234433]/50 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#234433]">
        <button 
          onClick={() => signOut(auth)}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-stone-400 hover:text-[#EFA7A7] hover:bg-red-950/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Выйти
        </button>
      </div>
    </aside>
  );
}