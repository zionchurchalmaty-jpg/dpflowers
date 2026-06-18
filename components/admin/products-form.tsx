"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createContent, updateContent, getAdminContent } from "@/lib/firestore/client-content";
import { useAuth } from "./auth-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "./image-upload";

export function ProductForm({ initialData, isEditing = false }: any) {
  const { user } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  
  const [sections, setSections] = useState<any[]>([]);

  const methods = useForm({
    defaultValues: initialData || {
      contentType: "products",
      title: "",
      price: "",
      oldPrice: "",
      sectionId: "",
      description: "",
      image: "",
      status: "published"
    }
  });

  useEffect(() => {
    getAdminContent("sections").then(data => {
      setSections(data.sort((a, b) => (a.order || 0) - (b.order || 0)));
    });
  }, []);

  const onSubmit = async (data: any) => {
    if (!user) return;
    setSaving(true);
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
      };
      if (isEditing && initialData?.id) {
        await updateContent(initialData.id, payload);
      } else {
        await createContent(payload, user.uid, "Admin");
      }
      alert("Товар успешно сохранен!");
      router.push("/admin/products");
    } catch (e) {
      console.error(e);
      alert("Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 font-sans">
        <div className="flex flex-col lg:flex-row gap-6">
          
          <div className="flex-1 bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-semibold text-lg text-stone-800">Редактирование карточки товара</h3>
              <Button type="submit" disabled={saving || imageUploading} className="bg-[#1A3326] hover:bg-[#234433] text-white">
                {saving ? "Сохранение..." : "Сохранить товар"}
              </Button>
            </div>

            <div className="space-y-3">
              <Label className="text-stone-600">Название товара</Label>
              <Input {...methods.register("title", { required: true })} className="focus-visible:ring-[#1A3326]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label className="text-stone-600">Цена (₸)</Label>
                <Input type="number" {...methods.register("price", { required: true })} className="focus-visible:ring-[#1A3326]" />
              </div>
              <div className="space-y-3">
                <Label className="text-stone-600">Старая цена (зачеркнутая)</Label>
                <Input type="number" {...methods.register("oldPrice")} className="focus-visible:ring-[#1A3326]" />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-stone-600">Выбор коллекции / секции</Label>
              <select
                {...methods.register("sectionId", { required: true })}
                className="w-full flex h-10 rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1A3326]"
              >
                <option value="" disabled>Выберите секцию...</option>
                {sections.map(sec => (
                  <option key={sec.id} value={sec.id}>{sec.title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <Label className="text-stone-600">Описание состава и ухода</Label>
              <textarea
                {...methods.register("description")}
                className="w-full min-h-[120px] rounded-md border border-stone-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3326]"
                placeholder="Опишите состав букета, упаковку..."
              />
            </div>
          </div>

          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <Label className="text-stone-600">Фотография букета</Label>
              <ImageUpload
                value={methods.watch("image")}
                onChange={(val) => methods.setValue("image", val)}
                onUploadingChange={setImageUploading}
                folder="products"
                aspectRatio="4/5"
              />
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <Label className="text-stone-600">Статус наличия</Label>
              <select
                {...methods.register("status")}
                className="w-full flex h-10 rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1A3326]"
              >
                <option value="published">В наличии / Доступен</option>
                <option value="draft">Скрыт / Нет в наличии</option>
              </select>
            </div>
          </div>
          
        </div>
      </form>
    </FormProvider>
  );
}