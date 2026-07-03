import { ContentGrid } from "@/components/ui/content-grid";
import ArticleCard from "@/components/cards/ArticleCard";
import { getPublishedContent } from "@/lib/firestore/client-content";

export const revalidate = 60;

export default async function BlogPage() {
  const rawArticlesData = await getPublishedContent("blog");
  const articlesData = rawArticlesData.filter((article: any) => !article.isSeo);

  let allCategories: string[] = [];
  articlesData.forEach((article: any) => {
    const cat = article.category || article.tags; 
    
    if (!cat) return;

    if (Array.isArray(cat)) {
      cat.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          allCategories.push(item['ru']);
        } else if (typeof item === 'string') {
          allCategories.push(item);
        }
      });
    } 
    else if (typeof cat === 'object' && cat !== null) {
      allCategories.push(cat['ru']);
    } 
    else if (typeof cat === 'string') {
      allCategories.push(cat);
    }
  });

  const uniqueCategories = Array.from(new Set(allCategories.filter(Boolean))).slice(0, 6);

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
    <div className="min-h-screen bg-[#FCF9F5]">
      
      <section className="bg-[#1A3326] text-white pt-32 pb-20 md:pt-40 md:pb-24 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase block">
            Журнал DPFLOWERS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight">
            Блог о флористике
          </h1>
          <p className="text-stone-300 text-sm md:text-base font-light max-w-2xl mx-auto">
            Секреты ухода за срезанными цветами, тренды свадебных букетов и идеи для подарков любимым.
          </p>
          
          {uniqueCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 pt-6">
              {uniqueCategories.map(tag => (
                <span key={tag} className="border border-[#D4AF37] text-[#D4AF37] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <main className="pb-24 pt-16 max-w-7xl mx-auto px-6">
        <ContentGrid
          title="Свежие статьи"
          showPagination={true} 
          rows={3} 
          items={articlesData.map((article: any) => {
            const rawDate = article.date || article.createdAt || new Date().toISOString();

            return (
              <ArticleCard
                key={article.id}
                id={article.id}
                image={article.image || "/images/blog-placeholder.png"}
                imageAlt={article.seo?.imageAlt || article.title}
                category={getSingleCategory(article)} 
                date={rawDate} 
                title={article.title}
                excerpt={article.excerpt || article.description || "..."}
                link={`/${article.slug}`}
              />
            );
          })}
        />
      </main>
    </div>
  );
}