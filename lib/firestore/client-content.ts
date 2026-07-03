import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  setDoc,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ContentType } from "./types";
import slugify from "slugify";

export async function markLeadAsRead(leadId: string) {
  const docRef = doc(db, "leads", leadId);
  await updateDoc(docRef, { status: "read" });
}

export const COLLECTION_MAP: Record<ContentType, string> = {
  sections: "sections",
  products: "products",
  leads: "leads",
  blog: "blog",
  cases: "cases", // <-- Добавили
};

export const PLACEHOLDERS: Record<ContentType, string> = {
  sections: "/images/section-placeholder.png",
  products: "/images/product-placeholder.png",
  leads: "/images/placeholder.png",
  blog: "/images/blog-placeholder.png",
  cases: "/images/placeholder.png", // <-- Добавили (можешь заменить на свою картинку)
};

export function getCollection(type: ContentType): string {
  switch (type) {
    case "sections": return "sections";
    case "products": return "products";
    case "leads": return "leads";
    case "blog": return "blog";
    case "cases": return "cases"; // <-- Добавили
    default: return "products";
  }
}
export function generateSlug(title: string): string {
  return slugify(title, { lower: true, strict: true, locale: "ru" });
}

export function getPlaceholder(type: ContentType, isSeo?: boolean): string {
  if (type === "sections" && isSeo) return "/images/placeholder.png";
  return PLACEHOLDERS[type] || "/images/placeholder.png";
}

export function serializeFirebaseData(data: any): any {
  if (data === null || data === undefined) return null;

  if (Array.isArray(data)) {
    return data.map((item) => serializeFirebaseData(item));
  }

  if (typeof data === "object") {
    if (typeof data.toDate === "function") {
      return data.toDate().toISOString();
    }
    if ("seconds" in data && "nanoseconds" in data) {
      return new Date(data.seconds * 1000).toISOString();
    }
    if ("_seconds" in data && "_nanoseconds" in data) {
      return new Date(data._seconds * 1000).toISOString();
    }

    const result: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result[key] = serializeFirebaseData(data[key]);
      }
    }
    return result;
  }

  return data;
}

export function toFirestoreData(
  input: any,
  authorId: string,
  authorName: string,
) {
  const now = Timestamp.now();
  const mainImageUrl =
    input.image || getPlaceholder(input.contentType, input.isSeo);
  const titleText =
    input.title || input.title?.ru || input.title?.kz || "untitled";
  const slug = generateSlug(titleText);

  return {
    ...input,
    slug,
    isSeo: input.isSeo ?? false,
    image: mainImageUrl,
    seo: {
      metaTitle: input.seo?.metaTitle || "",
      metaDescription: input.seo?.metaDescription || "",
      ogImage: mainImageUrl,
      canonicalUrl: input.seo?.canonicalUrl || "",
      noIndex: input.seo?.noIndex || false,
      schemaMarkup: input.seo?.schemaMarkup || "",
      imageAlt: input.seo?.imageAlt || "",
      imageTitle: input.seo?.imageTitle || "",
      imageDescription: input.seo?.imageDescription || "",
    },
    date: input.date || now,
    updatedAt: now,
    createdBy: authorId,
    authorName,
  };
}

export async function getTopProjectsIds(): Promise<string[]> {
  const snap = await getDoc(doc(db, "settings", "general"));
  return snap.exists()
    ? snap.data()?.topProjectsIds || ["", "", ""]
    : ["", "", ""];
}

export async function updateTopProjectsIds(newIds: string[]): Promise<void> {
  const ref = doc(db, "settings", "general");
  await setDoc(ref, { topProjectsIds: newIds }, { merge: true });
}

export async function saveLead(data: {
  name: string;
  phone: string;
  message: string;
}) {
  const coll = collection(db, "leads");
  await addDoc(coll, {
    ...data,
    createdAt: Timestamp.now(),
    status: "new",
  });
}

export async function createContent(
  input: any,
  authorId: string,
  authorName: string,
): Promise<string> {
  const coll = getCollection(input.contentType);
  const data = toFirestoreData(input, authorId, authorName);
  const ref = await addDoc(collection(db, coll), {
    ...data,
    createdAt: data.date,
  });
  return ref.id;
}

export async function updateContent(id: string, input: any): Promise<void> {
  const coll = getCollection(input.contentType);
  const ref = doc(db, coll, id);
  const existing = await getDoc(ref);
  if (!existing.exists()) throw new Error("Document not found");

  const mainImageUrl =
    input.image || getPlaceholder(input.contentType, input.isSeo);
  const titleText =
    input.title || input.title?.ru || input.title?.kz || "untitled";
  const slug = generateSlug(titleText);

  await updateDoc(ref, {
    ...input,
    slug,
    isSeo: input.isSeo ?? false,
    image: mainImageUrl,
    seo: {
      ...(input.seo ?? existing.data()?.seo),
      ogImage: mainImageUrl,
      schemaMarkup:
        input.seo?.schemaMarkup || existing.data()?.seo?.schemaMarkup || "",
    },
    updatedAt: Timestamp.now(),
  });
}

export async function deleteContent(
  id: string,
  contentType?: ContentType,
): Promise<void> {
  if (contentType) {
    const coll = getCollection(contentType);
    const ref = doc(db, coll, id);
    if ((await getDoc(ref)).exists()) {
      await deleteDoc(ref);
      return;
    }
  }

  for (const c of ["products", "sections", "blog"]) {
    const ref = doc(db, c, id);
    if ((await getDoc(ref)).exists()) {
      await deleteDoc(ref);
      return;
    }
  }
  throw new Error("Document not found");
}

export async function getPublishedContent(
  type: ContentType,
  limitCount?: number,
): Promise<any[]> {
  const collName = getCollection(type);
  let q = query(
    collection(db, collName),
    where("status", "==", "published"),
    orderBy("date", "desc"),
  );
  if (limitCount) q = query(q, limit(limitCount));
  const snapshot = await getDocs(q);
  const rawData = snapshot.docs.map((d) => ({
    id: d.id,
    contentType: type,
    ...d.data(),
  }));
  return serializeFirebaseData(rawData) as any[];
}

export async function getContentById(
  id: string,
  type: ContentType,
  includeDrafts: boolean = false,
): Promise<any | null> {
  if (!id || typeof id !== "string") return null;
  const collName = getCollection(type);
  const snap = await getDoc(doc(db, collName, id));
  if (!snap.exists()) return null;
  const data = snap.data();
  if (!includeDrafts && data.status === "draft") return null;
  const rawData = { id: snap.id, contentType: type, ...data };
  return serializeFirebaseData(rawData) as any;
}

export async function getContentBySlug(
  slug: string,
  type: ContentType,
  includeDrafts: boolean = false,
): Promise<any | null> {
  if (!slug || typeof slug !== "string") return null;
  const collName = getCollection(type);
  let q = query(collection(db, collName), where("slug", "==", slug));
  if (!includeDrafts) q = query(q, where("status", "==", "published"));
  q = query(q, limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  const rawData = { id: docSnap.id, contentType: type, ...docSnap.data() };
  return serializeFirebaseData(rawData) as any;
}

export async function getAdminContent(type: ContentType): Promise<any[]> {
  const collName = getCollection(type);
  const q = query(collection(db, collName), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  const rawData = snapshot.docs.map((d) => ({
    id: d.id,
    contentType: type,
    ...d.data(),
  }));
  return serializeFirebaseData(rawData) as any[];
}

export async function getDashboardStats() {
  const [sectionsSnap, productsSnap, blogSnap] = await Promise.all([
    getCountFromServer(collection(db, "sections")),
    getCountFromServer(collection(db, "products")),
    getCountFromServer(collection(db, "blog")),
  ]);
  return {
    sectionsCount: sectionsSnap.data().count,
    productsCount: productsSnap.data().count,
    blogCount: blogSnap.data().count,
  };
}