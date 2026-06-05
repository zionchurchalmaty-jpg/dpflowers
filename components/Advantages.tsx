"use client";

import { Check, ShieldCheck, Users, Clock, Award } from "lucide-react";

export default function Advantages() {
  const cards = [
    {
      icon: ShieldCheck,
      title: "Подтверждённое качество",
      text: "Качество сварных соединений подтверждено протоколами неразрушающего контроля. Работаем по ГОСТ и СНиП."
    },
    {
      icon: Users,
      title: "Опытная команда",
      text: "Квалифицированные специалисты с возможностью расширения штата под масштабные промышленные проекты."
    },
    {
      icon: Clock,
      title: "Полный цикл работ",
      text: "От проектирования и расчётов до монтажа и сдачи объекта заказчику — всё в одних руках."
    },
    {
      icon: Award,
      title: "Индивидуальное производство",
      text: "Изготавливаем металлоконструкции по проекту заказчика с точным соблюдением технических требований."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#FAFAFA] relative border-y border-gray-200/60 overflow-hidden">
      <div className="absolute top-10 left-10 w-10 h-10 border-t-[3px] border-l-[3px] border-[#f99c00]/30 hidden lg:block" />
      <div className="absolute top-10 right-10 w-10 h-10 border-t-[3px] border-r-[3px] border-[#f99c00]/30 hidden lg:block" />
      <div className="absolute bottom-10 left-10 w-10 h-10 border-b-[3px] border-l-[3px] border-[#f99c00]/30 hidden lg:block" />
      <div className="absolute bottom-10 right-10 w-10 h-10 border-b-[3px] border-r-[3px] border-[#f99c00]/30 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 relative z-10">
        
        <div className="flex flex-col justify-center">
          <h3 className="text-[#f99c00] text-sm font-bold uppercase tracking-widest mb-3">
            Наши преимущества
          </h3>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
            Почему заказчики <br/>выбирают <span className="text-[#f99c00]">VT STROY</span>
          </h2>
          
          <ul className="space-y-4.5 mb-10 text-[15px] text-gray-700">
            <li className="flex items-start gap-3.5">
              <div className="w-5 h-5 bg-[#f99c00] text-white rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="leading-snug">Работаем официально по лицензии ГСЛ №0014386</span>
            </li>
            <li className="flex items-start gap-3.5">
              <div className="w-5 h-5 bg-[#f99c00] text-white rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="leading-snug">Соблюдаем сроки и строительные нормы</span>
            </li>
            <li className="flex items-start gap-3.5">
              <div className="w-5 h-5 bg-[#f99c00] text-white rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="leading-snug">Предоставляем прозрачную смету без скрытых расходов</span>
            </li>
            <li className="flex items-start gap-3.5">
              <div className="w-5 h-5 bg-[#f99c00] text-white rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="leading-snug">Выполняем строительно-монтажные работы под ключ</span>
            </li>
            <li className="flex items-start gap-3.5">
              <div className="w-5 h-5 bg-[#f99c00] text-white rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="leading-snug">Оперативно выезжаем на объект и подготавливаем расчёт</span>
            </li>
          </ul>

          <div className="border-l-[3px] border-[#f99c00] pl-6 mb-10 italic text-gray-500 text-[15px] max-w-md leading-relaxed bg-white py-3 pr-4 shadow-sm rounded-r-sm">
            Наша задача — выполнить работы качественно, безопасно и точно в согласованные сроки.
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="bg-[#f99c00] hover:bg-[#e08c00] text-gray-900 text-center font-bold text-[15px] px-8 py-4 rounded-sm transition-colors shadow-sm">
              Получить расчёт
            </a>
            <a href="#contact" className="border-2 border-gray-900 text-gray-900 hover:bg-[#1C2331] hover:border-[#1C2331] hover:text-white text-center font-bold text-[15px] px-8 py-4 rounded-sm transition-all shadow-sm">
              Обсудить объект
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200/60 p-8 relative hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 group flex flex-col rounded-sm"
            >
              <div className="absolute top-[-1px] left-[-1px] w-3 h-3 border-t-[2px] border-l-[2px] border-[#f99c00] transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute top-[-1px] right-[-1px] w-3 h-3 border-t-[2px] border-r-[2px] border-[#f99c00] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute bottom-[-1px] left-[-1px] w-3 h-3 border-b-[2px] border-l-[2px] border-[#f99c00] transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
              <div className="absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b-[2px] border-r-[2px] border-[#f99c00] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

              <div className="absolute top-1/2 left-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-1/2 right-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute left-1/2 top-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute left-1/2 bottom-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-12 h-12 bg-[#fff3e0] rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm flex items-center justify-center mb-6 group-hover:bg-[#f99c00] transition-colors duration-300">
                <card.icon className="w-6 h-6 text-[#f99c00] group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h4 className="text-[17px] font-extrabold text-gray-900 mb-3 leading-snug">{card.title}</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}