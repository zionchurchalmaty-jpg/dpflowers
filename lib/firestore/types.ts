export type ContentType = "products" | "sections" | "leads" | "blog";

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

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image: string;
  category?: string | string[];
  tags?: string[];
  isSeo: boolean;
  status: "published" | "draft";
  seo?: any;
  date: any;
  createdAt: any;
  updatedAt: any;
}