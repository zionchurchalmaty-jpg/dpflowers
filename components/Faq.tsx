"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Faq() {
  const faqs = [
    { q: "Выполняете ли вы строительство «под ключ»?", a: "Да, мы реализуем объекты «под ключ» — от разработки проекта и производства металлоконструкций до монтажа и сдачи объекта заказчику." },
    { q: "Какие объекты вы строите?", a: "Строим промышленные и коммерческие объекты: ангары, склады, производственные цеха, спортивные сооружения, торговые павильоны и другие здания из металлоконструкций." },
    { q: "Поднимается ли цена в процессе строительства?", a: "Мы стараемся фиксировать стоимость работ ещё на этапе согласования сметы. Цена может измениться только в случае изменения объёма работ, проекта или стоимости материалов по согласованию с заказчиком. Все дополнительные работы обсуждаются заранее." },
    { q: "Есть ли у компании лицензия?", a: "Да, компания работает официально и имеет государственную строительную лицензию ГСЛ №0014386 на выполнение строительно-монтажных работ." },
    { q: "Работаете ли официально с ИП и ТОО?", a: "Да, мы официально работаем как с физическими лицами, так и с ИП, ТОО и другими организациями. Предоставляем договор, счета, акты выполненных работ и безналичную оплату." },
    { q: "Кто закупает материалы?", a: "По желанию заказчика материалы можем закупать как мы, так и сам клиент. Мы помогаем подобрать качественные материалы по оптимальной цене и предоставляем рекомендации исходя из задач объекта и бюджета." },
    { q: "Есть ли выезд на замер?", a: "Да, у нас есть выезд специалиста на объект для замера, консультации и предварительной оценки работ. Это помогает точно рассчитать объёмы, сроки и стоимость строительства." },
    { q: "Работаете ли вы по проекту заказчика?", a: "Да, мы работаем как по собственным типовым проектам, так и по чертежам и техническим заданиям заказчика с точным соблюдением требований." },
    { q: "Как рассчитывается стоимость объекта?", a: "Стоимость рассчитывается индивидуально — зависит от площади, высоты, типа конструкции и сложности работ. Предоставляем бесплатный расчёт после уточнения параметров." },
    { q: "Подтверждается ли качество сварочных работ?", a: "Да, качество сварных соединений подтверждается протоколами неразрушающего контроля испытательной лаборатории. Работаем в соответствии с ГОСТ и СНиП." },
    { q: "Работаете ли вы с крупными объёмами?", a: "Да, у нас есть возможность расширения производственных мощностей и команды под масштабные промышленные проекты любого объёма." },
    { q: "В какие сроки выполняются работы?", a: "Сроки зависят от объёма и сложности объекта. Небольшие проекты — от 7 дней, крупные промышленные — от 30 дней. Точные сроки фиксируем в договоре." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white border-t border-gray-100 relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h3 className="text-[#f99c00] text-sm font-bold uppercase tracking-widest mb-3">Ответы</h3>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Часто задаваемые вопросы
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-[-20px] left-[-40px] w-5 h-5 border-t-[2px] border-l-[2px] border-[#f99c00] hidden lg:block opacity-60" />
          <div className="absolute top-[-20px] right-[-40px] w-5 h-5 border-t-[2px] border-r-[2px] border-[#f99c00] hidden lg:block opacity-60" />
          <div className="absolute bottom-[-20px] left-[-40px] w-5 h-5 border-b-[2px] border-l-[2px] border-[#f99c00] hidden lg:block opacity-60" />
          <div className="absolute bottom-[-20px] right-[-40px] w-5 h-5 border-b-[2px] border-r-[2px] border-[#f99c00] hidden lg:block opacity-60" />

          <div className="flex flex-col">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`relative group border-b border-gray-200/60 transition-colors duration-300 ${openIndex === idx ? 'bg-white' : 'hover:bg-gray-50/50'}`}
              >
                <div className="absolute top-0 bottom-0 left-[-24px] w-2 hidden md:flex flex-col justify-between py-4 opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-1.5">
                  <div className="w-2 h-2 border-t-[2px] border-l-[2px] border-[#f99c00]" />
                  <div className="w-1.5 h-1.5 bg-[#f99c00] rounded-full -ml-[2px]" />
                  <div className="w-2 h-2 border-b-[2px] border-l-[2px] border-[#f99c00]" />
                </div>

                <div className="absolute top-0 bottom-0 right-[-24px] w-2 hidden md:flex flex-col justify-between items-end py-4 opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1.5">
                  <div className="w-2 h-2 border-t-[2px] border-r-[2px] border-[#f99c00]" />
                  <div className="w-1.5 h-1.5 bg-[#f99c00] rounded-full -mr-[2px]" />
                  <div className="w-2 h-2 border-b-[2px] border-r-[2px] border-[#f99c00]" />
                </div>

                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left py-5 px-2 md:px-4 focus:outline-none"
                >
                  <span className="font-extrabold text-[16px] text-gray-900 group-hover:text-[#f99c00] transition-colors pr-6 leading-snug">
                    {faq.q}
                  </span>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0 ${openIndex === idx ? 'bg-[#f99c00] text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-[#fff3e0] group-hover:text-[#f99c00]'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`} />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out px-2 md:px-4 ${openIndex === idx ? "max-h-[200px] opacity-100 pb-5" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-gray-600 text-[15px] leading-relaxed max-w-3xl">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
