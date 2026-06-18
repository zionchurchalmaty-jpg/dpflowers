"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { createContent, updateContent } from "@/lib/firestore/client-content";
import { useAuth } from "./auth-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "./image-upload";

export function SectionForm({ initialData, isEditing = false }: any) {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  
  const methods = useForm({
    defaultValues: initialData || {
      contentType: "sections",
      title: "",
      slug: "",
      image: "",
      isHomeDisplayed: true,
      order: 0,
      status: "published"
    }
  });

  const onSubmit = async (data: any) => {
    if (!user) return;
    setSaving(true);
    try {
      const payload = { 
        ...data, 
        order: Number(data.order),
        isHomeDisplayed: data.isHomeDisplayed === "true" || data.isHomeDisplayed === true 
      };
      if (isEditing && initialData?.id) {
        await updateContent(initialData.id, payload);
      } else {
        await createContent(payload, user.uid, "Admin");
      }
      alert("Секция успешно сохранена!");
    } catch (e) {
      alert("Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl border max-w-2xl mx-auto space-y-6 font-sans">
        <div className="border-b border-stone-100 pb-4">
          <h3 className="font-semibold text-xl text-stone-800">Управление категорией витрины</h3>
        </div>
        
        <div className="space-y-4">
          <Label className="font-medium text-stone-700">Обложка категории (будет на главной)</Label>
          <ImageUpload 
            value={methods.watch("image")} 
            onChange={(val) => methods.setValue("image", val)} 
            onUploadingChange={setImageUploading} 
            folder="sections" 
            label="Изображение категории" 
            aspectRatio="16/9" 
          />
        </div>

        <div className="space-y-3">
          <Label className="font-medium text-stone-700">Название категории (Например: Свадебные букеты)</Label>
          <Input {...methods.register("title", { required: true })} className="focus-visible:ring-[#1A3326]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label className="font-medium text-stone-700">Показывать на главной?</Label>
            <select 
              value={String(methods.watch("isHomeDisplayed"))} 
              onChange={(e) => methods.setValue("isHomeDisplayed", e.target.value === "true")}
              className="w-full border border-stone-200 rounded-md p-2.5 text-sm bg-white focus:outline-none focus:border-[#1A3326]"
            >
              <option value="true">Да, отображать</option>
              <option value="false">Скрыть с главной</option>
            </select>
          </div>

          <div className="space-y-3">
            <Label className="font-medium text-stone-700">Порядок сортировки (0, 1, 2...)</Label>
            <Input type="number" {...methods.register("order")} className="focus-visible:ring-[#1A3326]" />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={saving || imageUploading} 
          className="bg-[#1A3326] hover:bg-[#234433] w-full text-white py-6"
        >
          {saving ? "Сохранение..." : "Сохранить категорию"}
        </Button>
      </form>
    </FormProvider>
  );
}