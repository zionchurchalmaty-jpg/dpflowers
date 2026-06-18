import { getPublishedContent } from "@/lib/firestore/client-content";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, SearchX } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SearchPage(props: any) {
  const searchParams = await Promise.resolve(props.searchParams);
  const query = searchParams?.q?.toLowerCase().trim() || "";

  let searchResults: any[] = [];

  try {
    const allProducts = await getPublishedContent("products");

    searchResults = allProducts.filter((product: any) => {
      if (!query) return false;
      
      const safeTitle = String(product.title || "").toLowerCase();
      const safeDesc = String(product.description || "").toLowerCase();
      
      return safeTitle.includes(query) || safeDesc.includes(query);
    });
  } catch (error) {
    console.error("Ошибка при получении товаров для поиска:", error);
  }

  return (
    <main className="min-h-screen bg-[#FCF9F5] text-stone-800 font-sans pb-24 pt-32">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div>
            <Link href="/#catalog" className="inline-flex items-center text-sm text-stone-500 hover:text-[#1A3326] font-medium mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться в каталог
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-normal text-stone-900">
              {query ? (
                <>Результаты по запросу: <span className="text-[#1A3326] font-medium">«{searchParams?.q}»</span></>
              ) : (
                "Поиск по каталогу"
              )}
            </h1>
          </div>
          <span className="text-sm text-stone-500 font-medium tracking-widest uppercase">
            Найдено: {searchResults.length}
          </span>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {searchResults.map((product: any) => {
              const waText = encodeURIComponent(`Здравствуйте! Хочу заказать букет "${product.title}" за ${product.price} ₸.`);
              const whatsappUrl = `https://wa.me/77776862385?text=${waText}`;

              return (
                <div key={product.id} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300">
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
                      <p className="text-xs text-stone-500 line-clamp-2 font-light mb-4">{product.description}</p>
                    )}
                    
                    <div className="flex-grow" />
                    
                    <div className="flex items-center justify-between pt-4 border-t border-stone-50 mt-auto">
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
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-stone-100 shadow-sm">
            <SearchX className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h2 className="text-xl font-serif text-stone-800 mb-2">Ничего не найдено</h2>
            <p className="text-stone-500 font-light mb-6">Попробуйте изменить запрос или поискать другой букет.</p>
            <Link href="/#catalog" className="inline-flex bg-[#1A3326] hover:bg-[#234433] text-white px-6 py-3 rounded-full text-sm font-medium transition-colors shadow-sm">
              Перейти в каталог
            </Link>
          </div>
        )}
        
      </div>
    </main>
  );
}