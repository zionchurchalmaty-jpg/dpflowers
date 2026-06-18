"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Loader2, Flower2, Tag } from "lucide-react";
import { getAdminContent, deleteContent } from "@/lib/firestore/client-content";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAdminContent("products");
      setProducts(data);
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот товар? Это действие нельзя отменить.")) return;

    try {
      await deleteContent(id, "products");
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Не удалось удалить товар");
    }
  };

  return (
    <div className="bg-[#FCF9F5] min-h-screen p-6 md:p-8 font-sans">
      
      <div className="max-w-none mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-800 flex items-center gap-2 tracking-wide">
            <Flower2 className="w-6 h-6 text-[#1A3326]" />
            Управление товарами
          </h1>
          <p className="text-sm text-stone-500 mt-1 font-light">
            Добавляйте и редактируйте букеты и композиции на витрине
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="bg-[#1A3326] hover:bg-[#234433] text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          Добавить товар
        </Link>
      </div>

      <div className="max-w-none">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#1A3326]" />
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center shadow-sm max-w-3xl">
            <div className="w-16 h-16 bg-[#F4EFEA] rounded-full flex items-center justify-center mx-auto mb-4">
              <Flower2 className="w-8 h-8 text-[#1A3326]" />
            </div>
            <h3 className="text-lg font-semibold text-stone-800 mb-2">
              Нет добавленных товаров
            </h3>
            <p className="text-stone-500 max-w-sm mx-auto mb-6 font-light">
              Вы еще не добавили ни одного букета на витрину магазина.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title || "Фото товара"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm font-light">
                      Нет фото
                    </div>
                  )}
                  {product.status === "draft" && (
                    <div className="absolute top-3 right-3 bg-stone-800 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                      Скрыт
                    </div>
                  )}
                  {product.oldPrice && (
                    <div className="absolute top-3 left-3 bg-[#EFA7A7] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                      Sale
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-medium text-stone-900 leading-snug mb-2 line-clamp-2">
                    {product.title || "Без названия"}
                  </h3>

                  <div className="flex items-center gap-2 mb-4 text-sm text-[#1A3326] font-semibold">
                    <Tag className="w-4 h-4 text-[#D4AF37]" />
                    {product.price ? `${product.price.toLocaleString()} ₸` : "Цена не указана"}
                  </div>

                  <div className="flex-grow" />

                  <div className="flex items-center gap-2 pt-4 border-t border-stone-100 mt-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-stone-50 hover:bg-[#F4EFEA] hover:text-[#1A3326] text-stone-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Изменить
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-2 bg-stone-50 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}