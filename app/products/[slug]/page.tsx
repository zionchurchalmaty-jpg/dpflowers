import { notFound } from "next/navigation";
import { getContentBySlug, getContentById } from "@/lib/firestore/client-content";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check, ShieldCheck, Clock } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  let product: any = await getContentBySlug(slug, "products");
  if (!product) product = await getContentById(slug, "products");

  if (!product) return { title: "Букет не найден | DPFLOWERS" };

  const imageUrl = product.image || "/images/placeholder.png";

  return {
    title: product.seo?.metaTitle || `${product.title} | Купить букет в DPFLOWERS`,
    description: product.seo?.metaDescription || product.description || `Заказать ${product.title} с доставкой от 60 минут.`,
    openGraph: {
      images: [{ url: imageUrl, alt: product.title }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  let product: any = await getContentBySlug(slug, "products");
  if (!product) product = await getContentById(slug, "products");

  if (!product || product.status === "draft") {
    notFound();
  }

  const waText = encodeURIComponent(`Здравствуйте! Меня интересует букет "${product.title}"`);
  const whatsappUrl = `https://wa.me/77776862385?text=${waText}`;

  return (
    <main className="min-h-screen bg-[#FCF9F5] text-stone-800 font-sans pb-24 pt-32">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-8">
          <Link
            href="/#catalog"
            className="group inline-flex items-center text-sm font-medium text-stone-500 hover:text-[#1A3326] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Назад в каталог
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-6 relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#F4EFEA] border border-stone-100 shadow-sm group">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.seo?.imageAlt || product.title}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400 font-light">
                Фото композиции отсутствует
              </div>
            )}
            
            {product.oldPrice && (
              <span className="absolute top-4 left-4 bg-[#EFA7A7] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                Sale
              </span>
            )}
          </div>

          <div className="lg:col-span-6 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
                <Check className="w-3 h-3" /> В наличии
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-normal text-stone-900 leading-tight">
                {product.title}
              </h1>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm flex items-baseline gap-4">
              <span className="text-3xl font-bold text-[#1A3326]">
                {product.price?.toLocaleString()} ₸
              </span>
              {product.oldPrice && (
                <span className="text-lg text-stone-400 line-through font-light">
                  {product.oldPrice?.toLocaleString()} ₸
                </span>
              )}
            </div>

            {product.description && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Описание и Состав</h3>
                <p className="text-stone-600 leading-relaxed font-light whitespace-pre-line text-[15px]">
                  {product.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200/60 text-sm font-light text-stone-600">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Быстрая доставка от 60 минут</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Фото собранного букета перед отправкой</span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1A3326] hover:bg-[#234433] text-white py-4 px-8 rounded-full font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                Заказать через WhatsApp
              </a>
              <p className="text-center text-xs text-stone-400 mt-3 font-light">
                Нажав на кнопку, вы перейдете в чат с флористом для подтверждения деталей
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}