import { notFound } from "next/navigation";
import { getContentBySlug } from "@/lib/firestore/client-content";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, ShoppingBag } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string; locale?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getContentBySlug(slug, "blog");

  if (!article) return { title: "Статья не найдена | DPFLOWERS" };

  const imageUrl = article.image || "/images/blog-placeholder.png";
  const imageAlt = article.seo?.imageAlt || article.title;

  return {
    title: article.seo?.metaTitle || `${article.title} | Блог DPFLOWERS`,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: {
      images: [{ url: imageUrl, alt: imageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, locale } = await params;

  if (locale === "kz") notFound();

  const article = await getContentBySlug(slug, "blog");

  if (!article) notFound();

  const backHref = article.isSeo ? "/seo-blog" : "/blog";
  const backText = article.isSeo ? "Вернуться к статьям" : "Вернуться в блог";

  const rawDate = article.date || article.createdAt;
  const dateObject = rawDate && typeof rawDate === "object" && "toDate" in rawDate
      ? rawDate.toDate()
      : new Date(rawDate || Date.now());

  const formattedDate = dateObject.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const firstTag = article.tags && article.tags.length > 0 ? article.tags[0] : null;

  return (
    <>
      {article.seo?.schemaMarkup && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: article.seo.schemaMarkup }} />
      )}
      <main className="min-h-screen bg-[#FCF9F5] pt-32 pb-24 font-sans text-stone-800">
        
        <div className="border-b border-stone-200/80 mb-10 pb-6">
          <div className="max-w-4xl mx-auto px-6">
            <Link
              href={backHref}
              className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-[#1A3326] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backText}
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 mb-10">
          <div className="flex items-center gap-4 mb-6">
            {firstTag && (
              <span className="bg-[#F4EFEA] text-[#1A3326] px-3 py-1 rounded-md text-xs font-semibold tracking-wide uppercase">
                {firstTag}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-stone-500">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-stone-900 leading-tight">
            {article.title}
          </h1>
        </div>

        {article.image && (
          <div className="max-w-5xl mx-auto px-6 mb-12">
            <figure className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-[#F4EFEA] shadow-sm">
              <Image
                src={article.image}
                alt={article.seo?.imageAlt || article.title}
                title={article.seo?.imageTitle}
                fill
                className="object-cover" 
                priority
              />
            </figure>
          </div>
        )}

        <article className="max-w-3xl mx-auto px-6">
          {article.content && (
            <div 
              className="prose prose-lg max-w-none prose-stone prose-headings:font-serif prose-headings:font-normal prose-headings:text-stone-900 prose-a:text-[#1A3326] hover:prose-a:text-[#D4AF37] prose-a:transition-colors prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}

          <div className="mt-20 bg-[#1A3326] text-white rounded-3xl p-10 md:p-14 text-center shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-serif font-light mb-4">
                Понравилась статья?
              </h3>
              <p className="text-stone-300 mb-8 text-sm md:text-base font-light max-w-md mx-auto">
                Воплотим любые идеи в жизнь. Закажите авторский букет от наших флористов с доставкой за 60 минут.
              </p>
              <a 
                href="https://wa.me/77776862385" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#1A3326] px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#F4EFEA] transition-colors shadow-sm"
              >
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                Обсудить с флористом
              </a>
            </div>
            <div className="absolute inset-0 bg-black/10 z-0" />
          </div>

        </article>
      </main>
    </>
  );
}