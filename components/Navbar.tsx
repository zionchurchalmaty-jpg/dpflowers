"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 z-50 flex flex-col">
      <div 
        className={`bg-[#1C2331] text-gray-300 px-6 hidden md:block overflow-hidden transition-all duration-100 ease-in-out ${
          isScrolled ? "max-h-0 py-0 opacity-0" : "max-h-12 py-2.5 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[13px] tracking-wide">
          <a href="mailto:info@vtstroy.kz" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 text-[#f99c00]" /> info@vtstroy.kz
          </a>
          <div className="flex gap-8">
            <a href="tel:+77776862385" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#f99c00]" /> +7 (777) 686-23-85
            </a>
            <a href="tel:+77776862385" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#f99c00]" /> +7 (777) 686-23-85
            </a>
          </div>
        </div>
      </div>

      <div 
        className={`bg-white transition-all duration-100 border-[#f99c00] ${
          isScrolled ? "border-b-2 shadow-md" : "border-b-[4px] shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[100px] flex justify-between items-center">
          
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center shrink-0">
              <img 
                src="/logo.jpg" 
                alt="VT STROY Logo" 
                className="h-20 w-auto object-contain" 
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-10 relative px-8 py-3.5 shrink-0">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-[2px] border-l-[2px] border-[#f99c00]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[2px] border-r-[2px] border-[#f99c00]" />
            
            <Link href="/" className="text-[15px] font-medium text-gray-700 hover:text-[#f99c00] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#f99c00] after:transition-all after:duration-300 hover:after:w-full">Главная</Link>
            <Link href="/#services" className="text-[15px] font-medium text-gray-700 hover:text-[#f99c00] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#f99c00] after:transition-all after:duration-300 hover:after:w-full">Услуги</Link>
            <Link href="/#contact" className="text-[15px] font-medium text-gray-700 hover:text-[#f99c00] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#f99c00] after:transition-all after:duration-300 hover:after:w-full">Контакты</Link>
            <Link href="/blog" className="text-[15px] font-medium text-gray-700 hover:text-[#f99c00] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#f99c00] after:transition-all after:duration-300 hover:after:w-full">Блог</Link>
            <Link href="/projects" className="text-[15px] font-medium text-gray-700 hover:text-[#f99c00] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#f99c00] after:transition-all after:duration-300 hover:after:w-full">Наши работы</Link>
            <Link href="/#contact" className="text-[15px] font-medium text-gray-700 hover:text-[#f99c00] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#f99c00] after:transition-all after:duration-300 hover:after:w-full">Контакты</Link>
          </nav>

          <div className="flex-1 flex justify-end">
            <a href="#contact" className="hidden md:flex bg-[#f99c00] hover:bg-[#e08c00] text-gray-900 font-bold text-sm px-6 py-2.5 rounded-md transition-colors">
              Консультация
            </a>
          </div>
          
        </div>
      </div>
    </header>
  );
}