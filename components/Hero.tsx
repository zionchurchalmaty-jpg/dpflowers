"use client";

import { Check, Phone } from "lucide-react";

export default function Hero() {
  const stats = [
    { value: "70+", label: "Реализованных объектов" },
    { value: "10", label: "Лет на рынке" },
    { value: "1 год", label: "Гарантия на работы" },
    { value: "7–60", label: "Дней типовой монтаж" },
  ];

  return (
    <section className="bg-gray-900 text-white pt-[148px] px-6 relative overflow-hidden min-h-[100vh] flex items-center justify-center">      
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg 
          className="absolute inset-0 w-full h-full opacity-[0.05]" 
          viewBox="0 0 1400 680" 
          preserveAspectRatio="xMidYMid slice" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="60" y1="620" x2="1340" y2="620" stroke="#FFD89C" strokeWidth="1"></line>
          <line x1="60" y1="620" x2="60" y2="120" stroke="#FFD89C" strokeWidth="1"></line>
          <line x1="340" y1="620" x2="340" y2="120" stroke="#FFD89C" strokeWidth="1"></line>
          <line x1="620" y1="620" x2="620" y2="120" stroke="#FFD89C" strokeWidth="1"></line>
          <line x1="900" y1="620" x2="900" y2="120" stroke="#FFD89C" strokeWidth="1"></line>
          <line x1="1180" y1="620" x2="1180" y2="120" stroke="#FFD89C" strokeWidth="1"></line>
          <line x1="1340" y1="620" x2="1340" y2="120" stroke="#FFD89C" strokeWidth="1"></line>
          <line x1="60" y1="120" x2="1340" y2="120" stroke="#FFD89C" strokeWidth="1"></line>
          <line x1="60" y1="320" x2="1340" y2="320" stroke="#FFD89C" strokeWidth="0.8"></line>
          <line x1="60" y1="470" x2="1340" y2="470" stroke="#FFD89C" strokeWidth="0.8"></line>
          <g>
            <line x1="60" y1="120" x2="340" y2="320" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="340" y1="120" x2="60" y2="320" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="60" y1="320" x2="340" y2="470" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="340" y1="320" x2="60" y2="470" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="60" y1="470" x2="340" y2="620" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="340" y1="470" x2="60" y2="620" stroke="#FFD89C" strokeWidth="0.5"></line>
          </g>
          <g>
            <line x1="340" y1="120" x2="620" y2="320" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="620" y1="120" x2="340" y2="320" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="340" y1="320" x2="620" y2="470" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="620" y1="320" x2="340" y2="470" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="340" y1="470" x2="620" y2="620" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="620" y1="470" x2="340" y2="620" stroke="#FFD89C" strokeWidth="0.5"></line>
          </g>
          <g>
            <line x1="620" y1="120" x2="900" y2="320" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="900" y1="120" x2="620" y2="320" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="620" y1="320" x2="900" y2="470" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="900" y1="320" x2="620" y2="470" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="620" y1="470" x2="900" y2="620" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="900" y1="470" x2="620" y2="620" stroke="#FFD89C" strokeWidth="0.5"></line>
          </g>
          <g>
            <line x1="900" y1="120" x2="1180" y2="320" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="1180" y1="120" x2="900" y2="320" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="900" y1="320" x2="1180" y2="470" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="1180" y1="320" x2="900" y2="470" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="900" y1="470" x2="1180" y2="620" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="1180" y1="470" x2="900" y2="620" stroke="#FFD89C" strokeWidth="0.5"></line>
          </g>
          <g>
            <line x1="1180" y1="120" x2="1340" y2="320" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="1340" y1="120" x2="1180" y2="320" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="1180" y1="320" x2="1340" y2="470" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="1340" y1="320" x2="1180" y2="470" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="1180" y1="470" x2="1340" y2="620" stroke="#FFD89C" strokeWidth="0.5"></line>
            <line x1="1340" y1="470" x2="1180" y2="620" stroke="#FFD89C" strokeWidth="0.5"></line>
          </g>
          <line x1="1310" y1="620" x2="1310" y2="-20" stroke="#FFD89C" strokeWidth="0.8"></line>
          <line x1="1310" y1="0" x2="950" y2="0" stroke="#FFD89C" strokeWidth="1.5"></line>
          <line x1="1310" y1="0" x2="1380" y2="0" stroke="#FFD89C" strokeWidth="2"></line>
          <rect x="1360" y="-14" width="30" height="20" stroke="#FFD89C" strokeWidth="1.5" fill="none"></rect>
          <line x1="1310" y1="0" x2="1100" y2="0" stroke="#FFD89C" strokeWidth="1"></line>
          <line x1="1310" y1="60" x2="1100" y2="0" stroke="#FFD89C" strokeWidth="1"></line>
          <line x1="1310" y1="60" x2="950" y2="0" stroke="#FFD89C" strokeWidth="1"></line>
          <line x1="1080" y1="0" x2="1080" y2="180" stroke="#FFD89C" strokeWidth="1" strokeDasharray="5 4"></line>
          <rect x="1070" y="180" width="20" height="14" stroke="#FFD89C" strokeWidth="1.5" fill="none" rx="2"></rect>
          <line x1="1302" y1="0" x2="1318" y2="40" stroke="#FFD89C" strokeWidth="0.5"></line>
          <line x1="1302" y1="80" x2="1318" y2="120" stroke="#FFD89C" strokeWidth="0.5"></line>
          <line x1="1302" y1="160" x2="1318" y2="200" stroke="#FFD89C" strokeWidth="0.5"></line>
          <line x1="1302" y1="240" x2="1318" y2="280" stroke="#FFD89C" strokeWidth="0.5"></line>
          <line x1="1302" y1="320" x2="1318" y2="360" stroke="#FFD89C" strokeWidth="0.5"></line>
          <line x1="1302" y1="400" x2="1318" y2="440" stroke="#FFD89C" strokeWidth="0.5"></line>
          <line x1="1302" y1="480" x2="1318" y2="520" stroke="#FFD89C" strokeWidth="0.5"></line>
          <line x1="1302" y1="560" x2="1318" y2="600" stroke="#FFD89C" strokeWidth="0.5"></line>
          <circle cx="60" cy="120" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="60" cy="320" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="60" cy="470" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="60" cy="620" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="340" cy="120" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="340" cy="320" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="340" cy="470" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="340" cy="620" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="620" cy="120" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="620" cy="320" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="620" cy="470" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="620" cy="620" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="900" cy="120" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="900" cy="320" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="900" cy="470" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="900" cy="620" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="1180" cy="120" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="1180" cy="320" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="1180" cy="470" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="1180" cy="620" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="1340" cy="120" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="1340" cy="320" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="1340" cy="470" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
          <circle cx="1340" cy="620" r="4" stroke="#FFD89C" strokeWidth="1" fill="none"></circle>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        <div className="relative pt-6">
          <h1 className="text-5xl md:text-[64px] font-extrabold leading-[1.1] mb-8">
            Строительно-<br/>монтажные <br/>
            <span className="text-[#f99c00]">работы под ключ</span>
          </h1>
          <ul className="space-y-5 mb-10 text-[15px] md:text-base text-gray-300">
            <li className="flex items-center gap-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#f99c00] shrink-0">
                <Check className="w-4 h-4 text-gray-900 stroke-[3]" />
              </span>
              Реализуем крупные промышленные объекты любой сложности
            </li>
            <li className="flex items-center gap-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#f99c00] shrink-0">
                <Check className="w-4 h-4 text-gray-900 stroke-[3]" />
              </span>
              Сдаём объект полностью готовым к эксплуатации
            </li>
            <li className="flex items-center gap-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#f99c00] shrink-0">
                <Check className="w-4 h-4 text-gray-900 stroke-[3]" />
              </span>
              Точные инженерные расчёты и продуманные решения
            </li>
            <li className="flex items-center gap-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#f99c00] shrink-0">
                <Check className="w-4 h-4 text-gray-900 stroke-[3]" />
              </span>
              Современное промышленное оборудование и сертифицированные специалисты
            </li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a href="#contact" className="bg-[#f99c00] hover:bg-[#e08c00] text-gray-900 text-center font-bold px-8 py-4 transition-colors rounded-xl text-base">
              Получить расчёт
            </a>
            <a href="tel:+77776862385" className="border border-white/20 hover:border-white text-center px-8 py-4 font-semibold transition-colors text-base flex items-center gap-2 justify-center rounded-xl bg-gray-800/30">
              <Phone className="w-5 h-5"/> Позвонить
            </a>
          </div>
        </div>

        <div className="relative flex flex-col justify-center items-center lg:items-end mt-12 lg:mt-0 pt-4">
          <div className="grid grid-cols-2 gap-5 w-full max-w-[540px]">
            {stats.map((stat, idx) => (
              <div key={idx} className="border border-white/10 p-8 relative bg-white/[0.02] hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 rounded-xl flex flex-col gap-1 items-start group cursor-default">
                
                <div className="absolute top-[-1px] left-[-1px] w-3 h-3 border-t-[2px] border-l-[2px] border-[#f99c00] transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                <div className="absolute top-[-1px] right-[-1px] w-3 h-3 border-t-[2px] border-r-[2px] border-[#f99c00] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                <div className="absolute bottom-[-1px] left-[-1px] w-3 h-3 border-b-[2px] border-l-[2px] border-[#f99c00] transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
                <div className="absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b-[2px] border-r-[2px] border-[#f99c00] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

                <div className="absolute top-1/2 left-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-1/2 right-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute left-1/2 top-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute left-1/2 bottom-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="text-4xl md:text-5xl font-black text-[#f99c00] tracking-tight">{stat.value}</div>
                <div className="text-[13px] md:text-sm text-gray-400 font-medium pt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}