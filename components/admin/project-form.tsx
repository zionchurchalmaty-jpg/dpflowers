"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { Loader2, Save, Trash2, MapPin, Maximize } from "lucide-react";
import { useAuth } from "./auth-provider";
import { createContent, updateContent, deleteContent } from "@/lib/firestore/client-content";
import { ContentEditor } from "./content-editor";
import { SEOFields } from "./seo-fields";
import { ImageUpload } from "./image-upload";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentStatus } from "@/lib/firestore/types";

export function ProjectForm({ initialData, isEditing = false }: any) {
  const router = useRouter();
  const { user } = useAuth();
  
  const methods = useForm({
    defaultValues: initialData || {
      contentType: "projects",
      status: "published",
      image: "",
      title: "",
      location: "",
      area: "",
      description: "",
      tags: [],
      seo: { metaTitle: "", metaDescription: "", imageAlt: "" }
    },
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const onSubmit = async (data: any) => {
    if (!user) return alert("Ошибка: Вы не авторизованы!");

    setSaving(true);
    try {
      if (isEditing && initialData?.id) {
        await updateContent(initialData.id, data);
      } else {
        await createContent(data, user.uid, user.email || "Admin");
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось сохранить объект.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    setDeleting(true);
    try {
      await deleteContent(initialData.id, "projects");
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      alert("Ошибка при удалении.");
      setDeleting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 max-w-5xl mx-auto">
        
        <div className="flex items-center justify-between bg-white p-4 md:px-6 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-xl font-extrabold text-gray-900">
            {isEditing ? "Редактирование объекта" : "Добавление объекта"}
          </h1>
          <div className="flex items-center gap-3">
            {isEditing && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200">
                    <Trash2 className="mr-2 h-4 w-4" /> Удалить
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Удалить проект?</AlertDialogTitle>
                    <AlertDialogDescription>Действие необратимо.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                      {deleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Удалить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button 
              type="submit"
              disabled={saving || imageUploading} 
              className="bg-[#f99c00] hover:bg-[#e08c00] text-gray-900 font-bold px-6"
            >
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} 
              {isEditing ? "Сохранить" : "Опубликовать"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
              <div className="space-y-2">
                <Label className="font-bold">Название объекта</Label>
                <Input {...methods.register("title")} placeholder="Например: Склад 2500 м²" className="bg-gray-50 focus-visible:ring-[#f99c00]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold">Локация</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input {...methods.register("location")} className="pl-10 bg-gray-50 focus-visible:ring-[#f99c00]" placeholder="г. Алматы" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Площадь</Label>
                  <div className="relative">
                    <Maximize className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input {...methods.register("area")} className="pl-10 bg-gray-50 focus-visible:ring-[#f99c00]" placeholder="2 500 м²" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold">Описание работ</Label>
                <ContentEditor 
                  content={methods.watch("description")} 
                  onChange={(val) => methods.setValue("description", val)} 
                  placeholder="Опишите детали проекта..." 
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-5">
              <div className="space-y-2">
                <Label className="font-bold">Статус</Label>
                <Select value={methods.watch("status")} onValueChange={(v) => methods.setValue("status", v as ContentStatus)}>
                  <SelectTrigger className="focus:ring-[#f99c00]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Черновик</SelectItem>
                    <SelectItem value="published">Опубликовано</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
               <ImageUpload 
                  value={methods.watch("image")} 
                  onChange={(val) => methods.setValue("image", val)} 
                  onUploadingChange={setImageUploading} 
                  folder="projects" 
                  label="Фото объекта" 
                  aspectRatio="16/9" 
               />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               <SEOFields 
                 value={methods.watch("seo")} 
                 onChange={(val) => methods.setValue("seo", val)} 
                 defaultTitle={methods.watch("title")} 
                 image={methods.watch("image")} 
               />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}