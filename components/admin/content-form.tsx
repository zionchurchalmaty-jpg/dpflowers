"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentEditor } from "./content-editor";
import { SEOFields } from "./seo-fields";
import { ImageUpload } from "./image-upload";
import { useAuth } from "./auth-provider";
import {
  createContent,
  updateContent,
  deleteContent,
} from "@/lib/firestore/client-content";
import type {
  Content,
  ContentType,
  SEOData,
  ContentStatus,
} from "@/lib/firestore/types";
import { Loader2, Save, Trash2 } from "lucide-react";
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

interface ContentFormProps {
  contentType: ContentType;
  initialData?: Content;
  isEditing?: boolean;
}

export function ContentForm({
  contentType,
  initialData,
  isEditing = false,
}: ContentFormProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [isSeo, setIsSeo] = useState(initialData?.isSeo || false);
  const [readingTime, setReadingTime] = useState(initialData?.readingTime || "");

  const [image, setImage] = useState(
    initialData?.image || initialData?.coverImage || "",
  );

  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(", ") || "",
  );
  const [status, setStatus] = useState<ContentStatus>(
    initialData?.status || "published",
  );
  const [seo, setSeo] = useState<SEOData>(
    initialData?.seo || {
      metaTitle: "",
      metaDescription: "",
      ogImage: "",
      canonicalUrl: "",
      noIndex: false,
      imageAlt: "",
      imageTitle: "",
      imageDescription: "",
    },
  );

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const typeConfig: Record<string, { label: string; backPath: string }> = {
    content: { label: "Запись", backPath: "/admin/content" },
    projects: { label: "Объект", backPath: "/admin/projects" },
  };

  const config = typeConfig[contentType] || typeConfig.content;
  const contentTypeLabel = config.label;
  const backPath = config.backPath;

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const parsed = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setTags(parsed);
  };

  const handleSubmit = async (submitStatus?: ContentStatus) => {
    if (!user) return;

    const finalStatus = submitStatus || status;

    if (!title.trim()) {
      setError("Заголовок обязателен");
      return;
    }

    if (!content.trim()) {
      setError("Содержимое обязательно");
      return;
    }

    setError(null);
    setSaving(true);

    try {
      const cleanedSeo = { ...seo };
      if ((cleanedSeo as any).schemaMarkup) {
        (cleanedSeo as any).schemaMarkup = (cleanedSeo as any).schemaMarkup
          .replace(/<script[^>]*>/gi, '')
          .replace(/<\/script>/gi, '')
          .trim();
      }

      const input: any = {
        contentType,
        title: title.trim(),
        content,
        excerpt: excerpt.trim() || undefined,
        image: image || "",
        tags,
        status: finalStatus,
        seo: cleanedSeo,
        isSeo,
        readingTime: readingTime.trim()
      };

      if (isEditing && initialData) {
        await updateContent(initialData.id, input);
      } else {
        await createContent(
          input,
          user.uid,
          user.displayName || user.email || "Admin",
        );
      }

      router.push(backPath);
      router.refresh();
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Не удалось сохранить контент");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;

    setDeleting(true);
    try {
      await deleteContent(initialData.id, contentType);
      router.push(backPath);
      router.refresh();
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Не удалось удалить контент");
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      
      <div className="flex items-center justify-between bg-white p-4 md:px-6 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-xl font-extrabold text-gray-900">
          {isEditing
            ? `Редактирование: ${contentTypeLabel}`
            : `Создание: ${contentTypeLabel}`}
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
                  <AlertDialogTitle>Удалить этот материал?</AlertDialogTitle>
                  <AlertDialogDescription>Это действие нельзя отменить.</AlertDialogDescription>
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
            size="sm" 
            onClick={() => handleSubmit()} 
            disabled={saving || imageUploading} 
            className="bg-[#f99c00] hover:bg-[#e08c00] text-gray-900 font-bold px-6"
          >
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Сохранить
          </Button>
        </div>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700 font-bold">Заголовок</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Введите заголовок..." 
                className="text-lg bg-gray-50 focus-visible:ring-[#f99c00]" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 font-bold">Содержимое</Label>
              <ContentEditor content={content} onChange={setContent} placeholder="Напишите основной текст здесь..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-gray-700 font-bold">Краткое описание (для списка статей)</Label>
              <Textarea 
                id="excerpt" 
                value={excerpt} 
                onChange={(e) => setExcerpt(e.target.value)} 
                placeholder="Краткое содержание для карточки превью..." 
                rows={3} 
                className="bg-gray-50 focus-visible:ring-[#f99c00]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            
            {contentType === "content" && (
              <div className="space-y-2">
                <Label className="text-gray-700 font-bold">Размещение записи</Label>
                <Select
                  value={isSeo ? "seo" : "blog"}
                  onValueChange={(v) => setIsSeo(v === "seo")}
                >
                  <SelectTrigger className="focus:ring-[#f99c00]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">В блоге</SelectItem>
                    <SelectItem value="seo">SEO-статья</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-700 font-bold">Статус публикации</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as ContentStatus)}>
                <SelectTrigger className="focus:ring-[#f99c00]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Черновик</SelectItem>
                  <SelectItem value="published">Опубликовано</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-gray-700 font-bold">Теги</Label>
              <Input 
                id="tags" 
                value={tagsInput} 
                onChange={(e) => handleTagsChange(e.target.value)} 
                placeholder="склад, ангар, ГОСТ" 
                className="focus-visible:ring-[#f99c00]"
              />
            </div>
          </div>
          <div className="space-y-2">
  <Label htmlFor="readingTime" className="text-gray-700 font-bold">Время чтения</Label>
  <Input 
    id="readingTime" 
    value={readingTime} 
    onChange={(e) => setReadingTime(e.target.value)} 
    placeholder="например: 5 мин" 
    className="bg-gray-50 focus-visible:ring-[#f99c00]" 
  />
</div>

          <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <ImageUpload 
              value={image} 
              onChange={setImage} 
              onUploadingChange={setImageUploading} 
              folder="images" 
              label="Обложка" 
              description="Загрузите файл..." 
              aspectRatio="16/9" 
            />

            <div className="space-y-3 pt-4 border-t border-gray-100 mt-4">
              <h4 className="text-sm font-bold text-gray-900 leading-none">Метаданные обложки</h4>
              
              <div className="space-y-1.5">
                <Label htmlFor="imageAlt" className="text-xs text-gray-500">Alt</Label>
                <Input 
                  id="imageAlt" 
                  value={seo.imageAlt || ""} 
                  onChange={(e) => setSeo({ ...seo, imageAlt: e.target.value })} 
                  placeholder="Описание фото для SEO" 
                  className="h-8 text-sm focus-visible:ring-[#f99c00]" 
                />
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="imageTitle" className="text-xs text-gray-500">Заголовок (Title)</Label>
                <Input 
                  id="imageTitle" 
                  value={seo.imageTitle || ""} 
                  onChange={(e) => setSeo({ ...seo, imageTitle: e.target.value })} 
                  className="h-8 text-sm focus-visible:ring-[#f99c00]" 
                />
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="imageDesc" className="text-xs text-gray-500">Описание (Description)</Label>
                <Textarea 
                  id="imageDesc" 
                  value={seo.imageDescription || ""} 
                  onChange={(e) => setSeo({ ...seo, imageDescription: e.target.value })} 
                  rows={2} 
                  className="text-sm resize-none focus-visible:ring-[#f99c00]" 
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <SEOFields value={seo} onChange={setSeo} defaultTitle={title} image={image} />
          </div>
        </div>
      </div>
    </div>
  );
}