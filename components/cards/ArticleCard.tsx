import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

interface ArticleCardProps {
  id: string;
  image: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  link: string;
  imageAlt?: string;
}

export default function ArticleCard({
  id,
  image,
  category,
  date,
  title,
  excerpt,
  link,
}: ArticleCardProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Дата не указана";

  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-stone-100">
      
      <Link href={link} className="relative w-full aspect-[4/3] md:aspect-video shrink-0 overflow-hidden bg-[#F4EFEA]">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
      </Link>

      <div className="flex flex-col flex-grow p-6">
        
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-[#F4EFEA] text-[#1A3326] text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
            {category}
          </span>
          <div className="flex items-center text-stone-400 text-xs font-light gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </div>
        </div>

        <Link href={link} className="block group-hover:text-[#1A3326] transition-colors">
          <h3 className="text-xl font-serif font-normal text-stone-900 leading-snug mb-3">
            {title}
          </h3>
        </Link>
        
        <p className="text-sm text-stone-500 leading-relaxed mb-6 line-clamp-3 font-light">
          {excerpt}
        </p>

        <div className="flex-grow" />

        <Link
          href={link}
          className="inline-flex items-center text-xs font-bold text-[#1A3326] hover:text-[#D4AF37] transition-colors uppercase tracking-widest mt-auto pt-4 border-t border-stone-50"
        >
          Читать далее <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}