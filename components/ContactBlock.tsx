"use client";

import { useState } from "react";
import { Phone, Mail, Loader2 } from "lucide-react";
import { saveLead } from "@/lib/firestore/client-content";

export default function ContactBlock() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string || "Заявка с главной страницы",
    };

    try {
      await saveLead(data);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      alert("Ошибка при отправке. Пожалуйста, попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-[#1C2331] p-8 md:p-14 rounded-sm flex flex-col lg:flex-row gap-12 lg:gap-24 overflow-hidden group">
          
          <div className="absolute top-0 left-0 w-6 h-6 border-t-[2px] border-l-[2px] border-[#f99c00] m-4" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-[2px] border-r-[2px] border-[#f99c00] m-4" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[2px] border-l-[2px] border-[#f99c00] m-4" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[2px] border-r-[2px] border-[#f99c00] m-4" />

          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFD89C" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="flex-1 relative z-10">
            <h3 className="text-[#f99c00] text-sm font-bold uppercase tracking-wider mb-2">Бесплатно</h3>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Комплексный расчёт<br/>строительного объекта
            </h2>
            <p className="text-gray-400 text-sm mb-8 max-w-md">
              Подготовим техническое решение, предварительную смету и оптимальный план реализации проекта.
            </p>

            {success ? (
              <div className="bg-[#2A3245] p-8 text-center rounded-md border border-[#f99c00]/30">
                <p className="text-white font-bold text-lg">Спасибо! Заявка принята.</p>
                <p className="text-gray-400 text-sm mt-2">Наш специалист свяжется с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <input 
                  name="name"
                  type="text" 
                  placeholder="Ваше имя *" 
                  required
                  className="w-full bg-[#2A3245] border border-gray-700 text-white px-5 py-4 rounded-md focus:outline-none focus:border-[#f99c00] transition-colors"
                />
                <input 
                  name="phone"
                  type="tel" 
                  placeholder="Телефон *" 
                  required
                  pattern="^\+?[0-9\s\-]{7,15}$"
                  title="Введите корректный номер телефона (минимум 7 цифр)"
                  className="w-full bg-[#2A3245] border border-gray-700 text-white px-5 py-4 rounded-md focus:outline-none focus:border-[#f99c00] transition-colors"
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#f99c00] hover:bg-[#e08c00] text-gray-900 font-bold text-[15px] px-8 py-4 rounded-md transition-colors mt-2 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Получить консультацию"}
                </button>
                <p className="text-[11px] text-gray-500 text-center mt-3">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>

          <div className="flex-1 relative z-10 flex flex-col justify-center">
            <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Контакты</h4>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gray-700 rounded-md flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#f99c00]" />
                </div>
                <div>
                  <a href="tel:+77776862385" className="text-white font-bold text-lg hover:text-[#f99c00] transition-colors block leading-none mb-1">+7 (777) 686-23-85</a>
                  <span className="text-gray-500 text-xs">Алматы</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gray-700 rounded-md flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#f99c00]" />
                </div>
                <div>
                  <a href="mailto:info@vtstroy.kz" className="text-white font-bold text-lg hover:text-[#f99c00] transition-colors block leading-none mb-1">info@vtstroy.kz</a>
                  <span className="text-gray-500 text-xs">Email</span>
                </div>
              </div>
            </div>

            <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Мессенджеры</h4>
            <a href="https://wa.me/77776862385" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-max px-6 py-2.5 bg-[#00A859]/10 text-[#00A859] hover:bg-[#00A859] hover:text-white border border-[#00A859]/20 rounded-md transition-all text-sm font-medium gap-2 mb-8">
                WhatsApp
            </a>

            <div className="border border-gray-700/50 p-6 rounded-md bg-[#2A3245]/30">
              <h5 className="text-[#f99c00] font-bold text-sm mb-2">Гарантия на все работы</h5>
              <p className="text-gray-400 text-xs leading-relaxed">
                ТОО «VT STROY» предоставляет гарантию на выполненные работы и осуществляет послегарантийное обслуживание.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}