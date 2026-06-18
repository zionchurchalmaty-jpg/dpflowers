import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductForm } from "@/components/admin/products-form";

export const metadata: Metadata = {
  title: "Добавить товар | Админка",
};

export default function NewProductPage() {
  return (
    <div className="min-h-screen p-6 md:p-8 font-sans">
      <div className="max-w-5xl mb-6 flex items-center gap-4">
        <Link 
          href="/admin/products" 
          className="p-2 rounded-full hover:bg-[#F4EFEA] text-stone-500 hover:text-[#1A3326] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold text-stone-900">Добавление нового товара</h1>
      </div>

      <ProductForm />
    </div>
  );
}