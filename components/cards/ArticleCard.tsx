import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Clock } from "lucide-react";

interface ArticleCardProps {
  id: string;
  image: string;
  tags?: string[];
  date: string;
  title: string;
  excerpt: string;
  link: string;
  imageAlt?: string;
  readingTime?: string;
}

export default function ArticleCard({
  id,
  image,
  tags = [],
  date,
  title,
  excerpt,
  link,
  imageAlt,
  readingTime,
}: ArticleCardProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "Дата не указана";

  return (
    <Link 
      href={link} 
      className="group flex flex-col bg-white border border-gray-200/60 relative rounded-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 h-full"
    >
      <div className="relative w-full aspect-[2560/1695] overflow-hidden bg-[#1C2331]">
        <Image 
          src={image} 
          alt={imageAlt || title} 
          fill 
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          {tags.slice(0, 3).map((tag, idx) => (
            <div key={idx} className="bg-[#f99c00] text-gray-900 text-[10px] font-black px-3 py-1.5 uppercase tracking-wider rounded-sm shadow-sm">
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6 md:p-8">
        <div className="flex items-center text-gray-500 text-xs font-bold gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#f99c00]" />
            {formattedDate}
          </div>
          {readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#f99c00]" />
              {readingTime}
            </div>
          )}
        </div>

        <h3 className="text-[19px] font-extrabold text-gray-900 leading-snug mb-3 group-hover:text-[#f99c00] transition-colors">
          {title}
        </h3>
        
        <p className="text-[14px] text-gray-600 leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex-grow" />

        <div className="flex items-center text-[13px] font-bold text-[#f99c00] uppercase tracking-wider mt-4 pt-5 border-t border-gray-100">
          Читать далее <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}