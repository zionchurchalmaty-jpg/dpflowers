import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getContentById, serializeFirebaseData } from "@/lib/firestore/client-content";
import { ProductForm } from "@/components/admin/products-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;

  const rawProduct = await getContentById(id, "products", true);

  if (!rawProduct) {
    redirect("/admin/products");
  }

  const cleanProduct = serializeFirebaseData(rawProduct);

  return (
    <div className="bg-[#FCF9F5] min-h-screen p-6 md:p-8 font-sans">
      <div className="max-w-5xl mb-6 flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 rounded-full hover:bg-[#F4EFEA] text-stone-500 hover:text-[#1A3326] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold text-stone-900">Редактирование товара</h1>
      </div>

      <ProductForm initialData={cleanProduct} isEditing={true} />
    </div>
  );
}