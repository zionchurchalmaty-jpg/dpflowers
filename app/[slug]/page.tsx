import { notFound } from "next/navigation";
import { getContentBySlug, getContentById } from "@/lib/firestore/client-content";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let article: any = await getContentBySlug(slug, "content");
  if (!article) article = await getContentById(slug, "content");

  if (!article) return { title: "Статья не найдена | VT STROY" };

  const imageUrl = article.image || "/images/blog-placeholder.png";
  const imageAlt = article.seo?.imageAlt || article.title;

  return {
    title: article.seo?.metaTitle || `${article.title} | База знаний VT STROY`,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: {
      images: [{ url: imageUrl, alt: imageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let article: any = await getContentBySlug(slug, "content");
  if (!article) article = await getContentById(slug, "content");

  if (!article) notFound();

  const formattedDate = article.date || article.createdAt
    ? new Date(article.date || article.createdAt).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  const tags = Array.isArray(article.tags) ? article.tags : [];

  return (
    <>
      {article.seo?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: article.seo.schemaMarkup }}
        />
      )}
      <main className="min-h-screen bg-[#FAFAFA] pt-42 pb-24 font-sans">
        
        {!article.isSeo && (
          <div className="max-w-4xl mx-auto px-6 mb-10">
            <Link
              href="/blog"
              className="group inline-flex items-center text-[15px] font-bold text-gray-500 hover:text-[#f99c00] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Вернуться к списку статей
            </Link>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-6 mb-10">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {tags.length > 0 && (
              <div className="flex gap-2">
                {tags.slice(0, 3).map((tag: string, idx: number) => (
                  <span key={idx} className="bg-[#f99c00] text-gray-900 px-3 py-1.5 rounded-sm text-[11px] font-black tracking-wider uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#f99c00]" />
                {formattedDate}
              </span>
              {article.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#f99c00]" />
                  {article.readingTime}
                </span>
              )}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            {article.title}
          </h1>
        </div>

        {article.image && (
          <div className="max-w-5xl mx-auto px-6 mb-12 relative group">
            <div className="absolute top-[-2px] left-4 w-4 h-4 border-t-[3px] border-l-[3px] border-[#f99c00] z-20" />
            <div className="absolute top-[-2px] right-4 w-4 h-4 border-t-[3px] border-r-[3px] border-[#f99c00] z-20" />
            <div className="absolute bottom-[-2px] left-4 w-4 h-4 border-b-[3px] border-l-[3px] border-[#f99c00] z-20" />
            <div className="absolute bottom-[-2px] right-4 w-4 h-4 border-b-[3px] border-r-[3px] border-[#f99c00] z-20" />

            <figure className="relative w-full aspect-[21/9] rounded-sm overflow-hidden bg-[#1C2331] shadow-md z-10">
              <Image
                src={article.image}
                alt={article.seo?.imageAlt || article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                priority
              />
            </figure>
          </div>
        )}

        <article className="max-w-4xl mx-auto px-6">
          {article.content && (
            <div 
              className="prose prose-lg max-w-none text-gray-700 prose-headings:font-extrabold prose-headings:text-gray-900 prose-a:text-[#f99c00] prose-a:no-underline hover:prose-a:underline prose-img:rounded-sm"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}

          <div className="mt-20 bg-[#1C2331] rounded-sm p-10 md:p-14 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Нужна консультация специалиста?</h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Оставьте заявку, и мы свяжемся с вами.</p>
              <Link href="/#contact" className="inline-block bg-[#f99c00] text-gray-900 px-10 py-4 rounded-sm font-bold hover:bg-[#e08c00] transition-colors">
                Оставить заявку
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}