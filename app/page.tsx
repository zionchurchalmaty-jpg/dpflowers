import { getPublishedContent } from "@/lib/firestore/client-content";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Flower2 } from "lucide-react";

export default async function FlowerShopHomePage() {
  const allSections = await getPublishedContent("sections", 100);
  const allProducts = await getPublishedContent("products", 500);

  const activeSections = allSections
    .filter((sec: any) => sec.isHomeDisplayed === true && sec.status === "published")
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  return (
    <main className="min-h-screen bg-[#FCF9F5] text-stone-800 font-sans pb-24 pt-20">
      
      <section className="relative bg-[#1A3326] text-white py-32 md:py-40 text-center px-4 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase block">
            Студия авторской флористики
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-tight">
            Цветы, которые <br/> говорят за вас
          </h1>
          <p className="text-stone-300 text-sm md:text-base font-light max-w-xl mx-auto">
            Доставка свежих букетов по городу от 60 минут. Оформите заказ в один клик через WhatsApp.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/20 z-0" /> 
      </section>

      {activeSections.length > 0 && (
        <section id="categories" className="max-w-7xl mx-auto px-6 mt-16 mb-10 scroll-mt-28">
          <h2 className="text-xl md:text-2xl font-serif text-stone-900 mb-6 border-b border-stone-200/80 pb-4">
            Категории
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {activeSections.map((section: any) => (
              <a 
                key={`nav-${section.id}`}
                href={`#section-${section.slug || section.id}`} 
                className="group relative h-32 md:h-40 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all block bg-[#234433]"
              >
                {section.image ? (
                  <Image 
                    src={section.image} 
                    alt={section.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Flower2 className="w-10 h-10 text-white" /> 
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity" />
                <div className="absolute inset-0 p-4 flex flex-col justify-end items-center text-center">
                  <span className="text-white font-medium text-sm md:text-base leading-tight tracking-wide group-hover:text-[#D4AF37] transition-colors">
                    {section.title}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <div id="catalog" className="max-w-7xl mx-auto px-6 space-y-24 mt-16">
        {activeSections.map((section: any) => {
          const sectionProducts = allProducts.filter(
            (prod: any) => prod.sectionId === section.id && prod.status === "published"
          );

          if (sectionProducts.length === 0) return null;

          return (
            <section key={section.id} id={`section-${section.slug || section.id}`} className="space-y-8 scroll-mt-28">
              
              <div className="flex items-baseline justify-between border-b border-stone-200/80 pb-4">
                <h2 className="text-2xl md:text-3xl font-serif font-normal tracking-wide text-stone-900">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {sectionProducts.map((product: any) => {
                  const waText = encodeURIComponent(`Здравствуйте! Хочу заказать букет "${product.title}"`);
                  const whatsappUrl = `https://wa.me/77776862385?text=${waText}`;

                  return (
                    <div key={product.id} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300">
                      
                      <Link href={`/products/${product.slug || product.id}`} className="flex flex-col flex-grow cursor-pointer">
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4EFEA]">
                          {product.image ? (
                            <Image 
                              src={product.image} 
                              alt={product.title} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-stone-400 text-xs font-light">Нет фото</div>
                          )}
                          {product.oldPrice && (
                            <span className="absolute top-3 left-3 bg-[#EFA7A7] text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                              Sale
                            </span>
                          )}
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="font-medium text-stone-900 text-base leading-snug line-clamp-2 group-hover:text-[#1A3326] transition-colors mb-2">
                            {product.title}
                          </h3>
                          {product.description && (
                            <p className="text-xs text-stone-500 line-clamp-2 font-light">{product.description}</p>
                          )}
                        </div>
                      </Link>
                      
                      <div className="px-5 pb-5 mt-auto">
                        <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                          <div>
                            <span className="text-lg font-semibold text-stone-900">{product.price?.toLocaleString()} ₸</span>
                            {product.oldPrice && (
                              <span className="text-xs text-stone-400 line-through block font-light mt-0.5">{product.oldPrice?.toLocaleString()} ₸</span>
                            )}
                          </div>
                          
                          <a 
                            href={whatsappUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-[#1A3326] hover:bg-[#234433] text-white p-3 rounded-full transition-colors flex items-center justify-center shadow-sm"
                            title="Заказать в WhatsApp"
                          >
                            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                          </a>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}