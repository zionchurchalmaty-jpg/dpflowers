"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-[#FCF9F5]/95 backdrop-blur-md border-b border-stone-200/50 font-sans transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <Link href="/" className="shrink-0">
          <span className="text-[#1A3326] font-serif font-bold text-2xl tracking-widest uppercase">
            DPFLOWERS
          </span>
        </Link>

        <div className="hidden md:flex items-center justify-center flex-1 gap-10">
          <Link href="/#categories" className="text-xs font-semibold uppercase tracking-widest text-stone-500 hover:text-[#1A3326] transition-colors">
            Категории
          </Link>
          <Link href="/#catalog" className="text-xs font-semibold uppercase tracking-widest text-stone-500 hover:text-[#1A3326] transition-colors">
            Витрина
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 shrink-0">
          
          <form onSubmit={handleSearch} className="relative group flex items-center">
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 focus:w-48 bg-transparent border-b border-stone-300 py-1.5 pl-1 pr-7 text-sm focus:outline-none focus:border-[#1A3326] transition-all placeholder:text-stone-400 font-light"
            />
            <button type="submit" className="absolute right-0 text-stone-400 group-hover:text-[#1A3326] transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <a 
            href="https://wa.me/77776862385" 
            target="_blank" 
            rel="noreferrer" 
            className="bg-[#1A3326] hover:bg-[#234433] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            Сделать заказ
          </a>
        </div>

        <button 
          className="md:hidden text-[#1A3326] p-2" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#FCF9F5] border-b border-stone-200 px-6 py-6 flex flex-col gap-6 shadow-xl">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Поиск букета..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-full py-3 pl-5 pr-12 text-base focus:outline-none focus:border-[#1A3326]"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
              <Search className="w-5 h-5" />
            </button>
          </form>

          <nav className="flex flex-col gap-4">
            <Link href="/#categories" onClick={() => setIsOpen(false)} className="text-sm font-semibold uppercase tracking-widest text-stone-600">
              Категории
            </Link>
            <Link href="/#catalog" onClick={() => setIsOpen(false)} className="text-sm font-semibold uppercase tracking-widest text-stone-600">
              Витрина
            </Link>
          </nav>
          
          <a 
            href="https://wa.me/77776862385" 
            target="_blank" 
            rel="noreferrer" 
            className="bg-[#1A3326] text-white px-6 py-4 rounded-full text-center text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            Сделать заказ
          </a>
        </div>
      )}
    </nav>
  );
}