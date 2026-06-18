export type ContentType = "products" | "sections" | "leads";

export interface Section {
  id: string;
  title: string;
  slug: string;
  isHomeDisplayed: boolean;
  order: number;
  status: "published" | "draft";
  createdAt: any;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  sectionId: string;
  image: string;
  tags: string[];
  status: "published" | "draft";
  createdAt: any;
}