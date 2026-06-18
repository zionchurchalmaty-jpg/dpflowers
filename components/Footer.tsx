"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A3326] text-stone-300 border-t border-[#234433] font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8">
          
          <div className="flex flex-col md:pr-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[220px] h-[50px] bg-white/5 rounded-sm p-2 flex items-center justify-center border border-white/10">
                <span className="text-[#D4AF37] font-serif font-bold text-xl tracking-widest uppercase">DPFlowers</span>
              </div>
              <p className="text-sm font-light leading-relaxed">
                Студия авторской <br/>флористики и декора
              </p>
            </div>

            <div className="relative border border-[#D4AF37]/30 p-6 rounded-sm bg-[#234433]/30">
              <h4 className="text-[#D4AF37] font-serif uppercase tracking-widest text-sm mb-4">
                Доставка и оплата
              </h4>
              <ul className="space-y-2 text-[13px] font-light">
                <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-stone-400">Время доставки:</span><span className="text-white text-right">От 60 минут</span></li>
                <li className="flex justify-between border-b border-white/5 py-2"><span className="text-stone-400">График работы:</span><span className="text-white text-right">Круглосуточно 24/7</span></li>
                <li className="flex justify-between border-b border-white/5 py-2"><span className="text-stone-400">Оплата:</span><span className="text-white text-right">Kaspi, Карты, Наличные</span></li>
                <li className="flex justify-between pt-2"><span className="text-stone-400">Свежесть:</span><span className="text-white text-right">Гарантия 48 часов</span></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-10 lg:pl-10">
            <div>
              <h4 className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-6">Каталог</h4>
              <nav className="flex flex-col space-y-4 text-sm font-light">
                <Link href="/" className="hover:text-[#EFA7A7] transition-colors">Главная витрина</Link>
                <Link href="/#catalog" className="hover:text-[#EFA7A7] transition-colors">Все букеты</Link>
                <Link href="/#delivery" className="hover:text-[#EFA7A7] transition-colors">Условия доставки</Link>
                <Link href="/#about" className="hover:text-[#EFA7A7] transition-colors">О студии</Link>
              </nav>
            </div>

            <div>
              <h4 className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-6">Связь с нами</h4>
              <ul className="space-y-5 text-sm font-light">
                <li><a href="tel:+77776862385" className="flex items-center gap-3 hover:text-[#EFA7A7] transition-colors"><Phone className="w-4 h-4 text-[#D4AF37]" /> +7 (777) 686-23-85</a></li>
                <li><a href="mailto:hello@mail.kz" className="flex items-center gap-3 hover:text-[#EFA7A7] transition-colors"><Mail className="w-4 h-4 text-[#D4AF37]" /> hello@mail.kz</a></li>
                <li className="flex items-start gap-3 text-stone-400 max-w-[200px]">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <span className="leading-relaxed">Алматы, пр. Абая, 140 (Вход со двора)</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-[#234433]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-stone-500">
          <p>© 2026 Студия флористики DPFlowers. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#EFA7A7] transition-colors"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}