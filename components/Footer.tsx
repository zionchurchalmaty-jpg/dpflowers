"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { LeadForm } from "./LeadForm";
export default function Footer() {
  return (
    <footer className="bg-[#111722] text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[120px] h-[50px] bg-white rounded-sm p-1">
                <img src="/logo.jpg" alt="VT STROY" className="w-full h-full object-contain" />
              </div>
              <p className="text-sm leading-snug">
                Товарищество с ограниченной <br/>ответственностью «VT STROY»
              </p>
            </div>

            <div className="relative border border-[#f99c00]/20 p-6 rounded-sm bg-[#1C2331]/30 mt-auto">
              <div className="absolute top-[-1px] left-[-1px] w-3 h-3 border-t-[2px] border-l-[2px] border-[#f99c00]" />
              <div className="absolute top-[-1px] right-[-1px] w-3 h-3 border-t-[2px] border-r-[2px] border-[#f99c00]" />
              <div className="absolute bottom-[-1px] left-[-1px] w-3 h-3 border-b-[2px] border-l-[2px] border-[#f99c00]" />
              <div className="absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b-[2px] border-r-[2px] border-[#f99c00]" />

              <h4 className="text-[#f99c00] font-black uppercase tracking-wider text-sm mb-4">
                Лицензия
              </h4>
              <ul className="space-y-2 text-[13px]">
                <li className="flex justify-between"><span className="text-gray-500">Номер:</span><span className="text-white font-medium text-right">ГСЛ №0014386</span></li>
                <li className="flex justify-between"><span className="text-gray-500">Дата выдачи:</span><span className="text-white font-medium text-right">27.03.2026</span></li>
                <li className="flex justify-between"><span className="text-gray-500">Вид деятельности:</span><span className="text-white font-medium text-right">Строительно-монтажные работы</span></li>
                <li className="flex justify-between"><span className="text-gray-500">Категория:</span><span className="text-white font-medium text-right">II категория</span></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col md:flex-row gap-10 lg:gap-16 lg:pl-10">
            <div>
              <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Навигация</h4>
              <nav className="flex flex-col space-y-3.5 text-sm">
                <Link href="/" className="hover:text-[#f99c00] transition-colors">Главная</Link>
                <Link href="/#services" className="hover:text-[#f99c00] transition-colors">Услуги</Link>
                <Link href="/#contact" className="hover:text-[#f99c00] transition-colors">Контакты</Link>
                <Link href="/blog" className="hover:text-[#f99c00] transition-colors">Блог</Link>
                <Link href="/seo-blog" className="hover:text-[#f99c00] transition-colors">SEO-статьи</Link>
                <Link href="/#about" className="hover:text-[#f99c00] transition-colors">О компании</Link>
                <Link href="/projects" className="hover:text-[#f99c00] transition-colors">Наши работы</Link>
              </nav>
            </div>

            <div>
              <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Алматы</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="tel:+77776862385" className="flex items-center gap-3 hover:text-[#f99c00] transition-colors"><Phone className="w-4 h-4 text-[#f99c00]" /> +7 (777) 686-23-85</a></li>
                <li><a href="mailto:info@vtstroy.kz" className="flex items-center gap-3 hover:text-[#f99c00] transition-colors"><Mail className="w-4 h-4 text-[#f99c00]" /> info@vtstroy.kz</a></li>
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-[#f99c00] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">050000, Казахстан, Алматы, мкр. Кок-Тобе, ул. Сагадат Нурмагамбетов, 140/1</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 lg:pl-10">
            <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Написать нам</h4>
            <LeadForm variant="default" />
          </div>

        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© 2026 ТОО «VT STROY». Все права защищены.</p>
          <p>Пн–Сб: 9:00 – 18:00</p>
        </div>
      </div>
    </footer>
  );
}