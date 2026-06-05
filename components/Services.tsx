"use client";

import { 
  Home, 
  Wrench, 
  Warehouse, 
  Layers, 
  Building2, 
  Hammer, 
  Check, 
  ArrowRight, 
  MapPin,
  Medal,
  Zap,
  FileText 
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Home,
      title: "Строительство домов",
      features: [
        "Частные жилые дома и коттеджи",
        "Металлокаркасные дома под ключ",
        "Проектирование и согласование",
        "Отделочные и фасадные работы"
      ],
      price: "от 150 000 ₸/м²"
    },
    {
      icon: Wrench,
      title: "Монтаж металлоконструкций",
      features: [
        "Монтаж каркасов зданий",
        "Установка колонн, балок, ферм",
        "Сварочные работы любой сложности",
        "Контроль качества по ГОСТ"
      ],
      price: "от 3 500 ₸/м²"
    },
    {
      icon: Warehouse,
      title: "Быстровозводимые ангары",
      features: [
        "Холодные ангары из профлиста",
        "Тёплые ангары с сэндвич-панелями",
        "Монтаж от 7 до 21 дня",
        "Площадь от 100 до 5 000 м²"
      ],
      price: "от 25 000 ₸/м²"
    },
    {
      icon: Layers,
      title: "Строительство складов",
      features: [
        "Складские комплексы любого масштаба",
        "Стеллажные системы и зонирование",
        "Ворота, рампы, погрузочные доки",
        "Строительство и сдача под ключ"
      ],
      price: "от 35 000 ₸/м²"
    },
    {
      icon: Building2,
      title: "Быстровозводимые здания",
      features: [
        "Торговые павильоны и магазины",
        "Производственные корпуса",
        "Офисные и административные здания",
        "Спортивные залы и комплексы"
      ],
      price: "от 40 000 ₸/м²"
    },
    {
      icon: Hammer,
      title: "Быстровозводимые конструкции",
      features: [
        "Навесы, козырьки, перегородки",
        "Нестандартные конструкции под заказ",
        "Каркасы любой конфигурации",
        "Быстрые сроки — от 7 дней"
      ],
      price: "от 15 000 ₸/м²"
    },
    {
      icon: Medal,
      title: "Капитальный ремонт",
      features: [
        "Ремонт и реконструкция зданий",
        "Усиление металлических конструкций",
        "Замена кровли и фасадных систем",
        "Демонтажные и отделочные работы"
      ],
      price: "Индивидуально"
    },
    {
      icon: Zap,
      title: "Электромонтажные работы",
      features: [
        "Монтаж электроснабжения объектов",
        "Прокладка кабельных трасс",
        "Установка щитового оборудования",
        "Подключение к сетям и сдача"
      ],
      price: "Индивидуально"
    },
    {
      icon: FileText,
      title: "Документация и узаконение",
      features: [
        "Разработка проектной документации",
        "Получение разрешений на строительство",
        "Узаконение самостроя",
        "Сопровождение в госорганах"
      ],
      price: "Индивидуально"
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-[#f99c00] text-sm font-bold uppercase tracking-widest mb-3">
              Что мы делаем
            </h3>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Наши услуги
            </h2>
          </div>
          
          <div className="inline-flex items-stretch text-sm font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-[#1C2331] text-[#f99c00] flex items-center justify-center px-4 py-2.5 rounded-l-sm">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="border border-l-0 border-[#f99c00] bg-white text-gray-800 px-5 py-2.5 rounded-r-sm">
              По всему <span className="text-[#f99c00]">Казахстану</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="relative bg-white border border-gray-200/60 p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 group flex flex-col rounded-sm"
            >
              <div className="absolute top-[-1px] left-[-1px] w-3 h-3 border-t-[2px] border-l-[2px] border-[#f99c00] transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute top-[-1px] right-[-1px] w-3 h-3 border-t-[2px] border-r-[2px] border-[#f99c00] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute bottom-[-1px] left-[-1px] w-3 h-3 border-b-[2px] border-l-[2px] border-[#f99c00] transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
              <div className="absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b-[2px] border-r-[2px] border-[#f99c00] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

              <div className="absolute top-1/2 left-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-1/2 right-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute left-1/2 top-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute left-1/2 bottom-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-14 h-14 bg-[#fff3e0] rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm flex items-center justify-center mb-6 group-hover:bg-[#f99c00] transition-colors duration-300">
                <service.icon className="w-7 h-7 text-[#f99c00] group-hover:text-white transition-colors duration-300" />
              </div>

              <h4 className="text-[19px] font-extrabold text-gray-900 mb-6 leading-snug">
                {service.title}
              </h4>

              <ul className="space-y-3.5 mb-8 flex-1">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] text-gray-600">
                    <Check className="w-4 h-4 text-[#f99c00] shrink-0 mt-0.5 stroke-[3]" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-6">
                <div className="inline-block border border-[#f99c00]/30 text-[#f99c00] font-bold text-[13px] px-4 py-1.5 bg-white rounded-sm">
                  {service.price}
                </div>
              </div>

              <button className="w-full bg-[#1C2331] text-white hover:bg-[#f99c00] hover:text-gray-900 font-bold text-[14px] px-6 py-4 flex justify-between items-center transition-all duration-300 rounded-sm rounded-tl-lg rounded-br-lg">
                Заказать расчёт
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}