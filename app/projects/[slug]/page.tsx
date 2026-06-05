import { notFound } from "next/navigation";
import { getContentBySlug, getContentById } from "@/lib/firestore/client-content";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Maximize, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  let project: any = await getContentBySlug(slug, "projects");
  if (!project) project = await getContentById(slug, "projects");

  if (!project) return { title: "Объект не найден | VT STROY" };

  const titleText = project.title?.ru || project.title || "Реализованный объект";
  const imageUrl = project.image || "/images/portfolio-1.jpg";

  return {
    title: `${titleText} | Реализованные объекты VT STROY`,
    description: project.description?.substring(0, 160) || "Ознакомьтесь с результатами строительства промышленного объекта от компании VT STROY.",
    openGraph: {
      images: [
        {
          url: imageUrl,
          alt: titleText,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let project: any = await getContentBySlug(slug, "projects");
  if (!project) project = await getContentById(slug, "projects");

  if (!project) {
    notFound();
  }

  const rawDate = project.date || project.createdAt;
  const dateObject =
    rawDate && typeof rawDate === "object" && "toDate" in rawDate
      ? rawDate.toDate()
      : new Date(rawDate || Date.now());

  const formattedDate = dateObject.toLocaleDateString("ru-RU", { 
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric" 
  });

  const title = project.title?.ru || project.title || "Реализованный объект";
  const description = project.description?.ru || project.description;
  const location = project.location?.ru || project.location;
  const area = project.area?.ru || project.area;

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-[160px] pb-24 font-sans">
      
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <Link
          href="/projects"
          className="group inline-flex items-center text-[15px] font-bold text-gray-500 hover:text-[#f99c00] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Вернуться к портфолио
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-6">
        
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="bg-[#1C2331] text-white px-3 py-1.5 rounded-sm text-xs font-bold tracking-widest uppercase shadow-sm">
            Проект
          </span>
          <span className="flex items-center gap-1.5 text-sm font-bold text-gray-500">
            <Calendar className="w-4 h-4 text-[#f99c00]" />
            {formattedDate}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-10 leading-tight">
          {title}
        </h1>

        {(location || area) && (
          <div className="flex flex-wrap gap-6 p-6 md:p-8 bg-white rounded-sm mb-12 border border-gray-200/60 shadow-sm relative group">
            <div className="absolute top-[-1px] left-[-1px] w-3 h-3 border-t-[2px] border-l-[2px] border-[#f99c00]" />

            {location && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-[#fff3e0] flex items-center justify-center text-[#f99c00] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Локация</p>
                  <p className="text-[15px] font-extrabold text-gray-900 leading-snug">{location}</p>
                </div>
              </div>
            )}
            
            {location && area && <div className="hidden md:block w-px h-12 bg-gray-200" />}

            {area && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-[#fff3e0] flex items-center justify-center text-[#f99c00] shrink-0">
                  <Maximize className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Площадь</p>
                  <p className="text-[15px] font-extrabold text-gray-900 leading-snug">{area}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {project.image && (
          <div className="mb-14 relative group">
            <div className="absolute top-[-2px] left-[-2px] w-4 h-4 border-t-[3px] border-l-[3px] border-[#f99c00] z-20 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
            <div className="absolute top-[-2px] right-[-2px] w-4 h-4 border-t-[3px] border-r-[3px] border-[#f99c00] z-20 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            <div className="absolute bottom-[-2px] left-[-2px] w-4 h-4 border-b-[3px] border-l-[3px] border-[#f99c00] z-20 transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
            <div className="absolute bottom-[-2px] right-[-2px] w-4 h-4 border-b-[3px] border-r-[3px] border-[#f99c00] z-20 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

            <figure className="relative w-full aspect-[16/9] overflow-hidden bg-[#1C2331] shadow-md rounded-sm z-10">
              <Image
                src={project.image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                priority
              />
            </figure>
          </div>
        )}

        {description && (
          <div className="mb-20">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">О проведенных работах</h2>
            <div className="text-[16px] text-gray-700 leading-relaxed whitespace-pre-wrap">
              {description}
            </div>
          </div>
        )}

        <div className="bg-[#1C2331] rounded-sm p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-project" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFD89C" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-project)" />
            </svg>
          </div>
          
          <div className="relative z-10 text-left md:max-w-md">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Понравился <span className="text-[#f99c00]">результат?</span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              Свяжитесь с нами, и инженеры VT STROY подготовят расчет для вашего будущего объекта.
            </p>
          </div>
          
          <div className="relative z-10 w-full md:w-auto shrink-0">
            <Link 
              href="/#contact" 
              className="flex items-center justify-center w-full md:w-auto bg-[#f99c00] text-gray-900 px-8 py-4 rounded-sm font-bold hover:bg-[#e08c00] transition-colors shadow-sm"
            >
              Обсудить проект <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

      </article>
    </main>
  );
}