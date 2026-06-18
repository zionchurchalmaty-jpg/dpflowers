import { adminDb } from "@/lib/firebase-admin";
import type { ContentType } from "./types";
import { getCollection, serializeFirebaseData } from "./client-content";

export async function getTopProjectsIdsAdmin(): Promise<string[]> {
  const snap = await adminDb!.collection("settings").doc("general").get();
  return snap.data()?.topProjectsIds || ["", "", ""];
}

export async function updateTopProjectsIdsAdmin(
  newIds: string[],
): Promise<void> {
  await adminDb!
    .collection("settings")
    .doc("general")
    .set({ topProjectsIds: newIds }, { merge: true });
}

export async function getPublishedContentAdmin(
  type: ContentType,
  limitCount?: number,
): Promise<any[]> {
  const collName = getCollection(type);
  let ref: any = adminDb!
    .collection(collName)
    .where("status", "==", "published")
    .orderBy("date", "desc");
  if (limitCount) ref = ref.limit(limitCount);

  const snapshot = await ref.get();
  const rawData = snapshot.docs.map((d: any) => ({
    id: d.id,
    contentType: type,
    ...d.data(),
  }));
  return serializeFirebaseData(rawData) as any[];
}

export async function getContentByIdAdmin(
  id: string,
  type: ContentType,
  includeDrafts: boolean = false,
): Promise<any | null> {
  if (!id || typeof id !== "string") return null;
  const collName = getCollection(type);
  const docSnap = await adminDb!.collection(collName).doc(id).get();

  if (!docSnap.exists) return null;
  const data = docSnap.data()!;
  if (!includeDrafts && data.status === "draft") return null;

  const rawData = { id: docSnap.id, contentType: type, ...data };
  return serializeFirebaseData(rawData) as any;
}

export async function getContentBySlugAdmin(
  slug: string,
  type: ContentType,
  includeDrafts: boolean = false,
): Promise<any | null> {
  if (!slug || typeof slug !== "string") return null;
  const collName = getCollection(type);

  let queryRef: any = adminDb!.collection(collName).where("slug", "==", slug);
  if (!includeDrafts) queryRef = queryRef.where("status", "==", "published");

  const snapshot = await queryRef.limit(1).get();
  if (snapshot.empty) return null;

  const docSnap = snapshot.docs[0];
  const rawData = { id: docSnap.id, contentType: type, ...docSnap.data() };
  return serializeFirebaseData(rawData) as any;
}

export async function getAdminContentAdmin(
  type: ContentType,
): Promise<any[]> {
  const collName = getCollection(type);
  const snapshot = await adminDb!
    .collection(collName)
    .orderBy("date", "desc")
    .get();
  const rawData = snapshot.docs.map((d: any) => ({
    id: d.id,
    contentType: type,
    ...d.data(),
  }));
  return serializeFirebaseData(rawData) as any[];
}

export async function getLeadsAdmin(limitCount: number = 5) {
  const snapshot = await adminDb!
    .collection("leads")
    .orderBy("createdAt", "desc")
    .limit(limitCount)
    .get();

  const rawData = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }));
  return serializeFirebaseData(rawData);
}

export async function getDashboardStatsAdmin() {
  const [sectionsSnap, productsSnap] = await Promise.all([
    adminDb!.collection("sections").count().get(),
    adminDb!.collection("products").count().get(),
  ]);
  return {
    sectionsCount: sectionsSnap.data().count,
    productsCount: productsSnap.data().count,
  };
}