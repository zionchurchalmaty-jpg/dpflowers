import ArticleCard from "@/components/cards/ArticleCard";
import { getPublishedContent } from "@/lib/firestore/client-content";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogPage() {
  const rawArticlesData = await getPublishedContent("content");
  
  const articlesData = rawArticlesData.filter((article: any) => !article.isSeo);

  const getSingleCategory = (article: any) => {
    const cat = article.category || article.tags;
    if (!cat) return "Статья";
    
    if (Array.isArray(cat) && cat.length > 0) {
      const first = cat[0];
      return typeof first === 'object' ? first['ru'] : first;
    }
    if (typeof cat === 'object' && cat !== null) return cat['ru'];
    return cat;
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-[160px] pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 mt-4">
          <Link href="/" className="hover:text-[#f99c00] transition-colors">Главная</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">База знаний</span>
        </nav>

        <div className="mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Полезные <span className="text-[#f99c00]">статьи</span>
          </h1>
          <p className="text-gray-600 max-w-2xl text-[15px] leading-relaxed">
            Делимся опытом, рассказываем о технологиях строительства и отвечаем на частые вопросы клиентов о металлоконструкциях.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articlesData.map((article: any) => {
            const rawDate = article.date || article.createdAt || new Date().toISOString();

            return (
<ArticleCard
  key={article.id}
  id={article.id}
  image={article.image || "/images/blog-placeholder.png"}
  tags={article.tags || []}
  date={article.date} 
  title={article.title}
  readingTime={article.readingTime}
  excerpt={article.excerpt}
  link={`/${article.slug || article.id}`}
/>
            );
          })}
        </div>

        {articlesData.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-medium bg-white rounded-xl border border-gray-200 shadow-sm mt-8">
            Статьи пока не добавлены. Скоро здесь появится много полезного материала.
          </div>
        )}

      </div>
    </main>
  );
}