import { MapPin, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPublishedContent } from "@/lib/firestore/client-content";

export default async function ProjectsPage() {
  const projects = await getPublishedContent("projects", 50);

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-[160px] pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 mt-4">
          <Link href="/" className="hover:text-[#f99c00] transition-colors">Главная</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Наши работы</span>
        </nav>

        <div className="mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Реализованные <span className="text-[#f99c00]">объекты</span>
          </h1>
          <p className="text-gray-600 max-w-2xl text-[15px] leading-relaxed">
            Ознакомьтесь с нашими выполненными проектами. Мы строим надежные промышленные и коммерческие здания, соблюдая все ГОСТы и сроки.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {projects.length > 0 ? (
            projects.map((project: any) => (
              <Link href={`/projects/${project.slug || project.id}`} key={project.id} className="group block relative rounded-sm">
                
                <div className="absolute top-[-2px] left-[-2px] w-3 h-3 border-t-[2px] border-l-[2px] border-[#f99c00] transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 z-30" />
                <div className="absolute top-[-2px] right-[-2px] w-3 h-3 border-t-[2px] border-r-[2px] border-[#f99c00] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 z-30" />
                <div className="absolute bottom-[-2px] left-[-2px] w-3 h-3 border-b-[2px] border-l-[2px] border-[#f99c00] transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:translate-y-1.5 z-30" />
                <div className="absolute bottom-[-2px] right-[-2px] w-3 h-3 border-b-[2px] border-r-[2px] border-[#f99c00] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5 z-30" />

                <div className="relative h-[320px] overflow-hidden rounded-sm bg-[#1C2331] shadow-sm group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500">
                  
                  <div className="absolute inset-0 bg-[#2A3245] group-hover:scale-110 transition-transform duration-700 ease-out z-0 flex items-center justify-center">
                    {project.image ? (
                      <Image 
                        src={project.image} 
                        alt={project.title || "Фото объекта"} 
                        fill 
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                      />
                    ) : (
                      <span className="text-gray-500 text-sm font-medium tracking-wide">Нет фото</span>
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C2331]/95 via-[#1C2331]/30 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-extrabold text-[19px] leading-snug mb-3 group-hover:text-[#f99c00] transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h4>
                    <div className="flex items-center text-[#f99c00] text-[13px] font-semibold tracking-wide">
                      <MapPin className="w-4 h-4 mr-1.5" /> {project.location || "Алматы"}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center py-20">Проектов пока нет.</p>
          )}
        </div>

        <div className="bg-[#1C2331] rounded-sm p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <pattern id="grid-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFD89C" strokeWidth="1"/>
               </pattern>
               <rect width="100%" height="100%" fill="url(#grid-cta)" />
             </svg>
          </div>
          
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Хотите реализовать <br/><span className="text-[#f99c00]">подобный проект?</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Оставьте заявку, и наши инженеры свяжутся с вами для предварительного расчета стоимости вашего объекта.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <Link 
              href="/#contact" 
              className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#f99c00] hover:bg-[#e08c00] text-gray-900 font-bold text-[15px] px-10 py-5 rounded-md transition-colors"
            >
              Обсудить проект
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}