export type ContentType = "products" | "sections" | "leads" | "blog" | "cases";
export type ContentStatus = "published" | "draft";

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  imageAlt?: string;
  imageTitle?: string;
  imageDescription?: string;
  schemaMarkup?: string;
}

export interface Section {
  id: string;
  title: string;
  slug: string;
  isHomeDisplayed: boolean;
  order: number;
  status: ContentStatus;
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
  status: ContentStatus;
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
  status: ContentStatus;
  seo?: SEOData;
  date: any;
  createdAt: any;
  updatedAt: any;
}

export interface ContentInput {
  contentType: ContentType;
  title: string;
  content?: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  status: ContentStatus;
  seo?: SEOData;
  isSeo?: boolean;
  [key: string]: any;
}

export interface Content {
  id: string;
  contentType: ContentType;
  title?: string;
  slug?: string;
  status?: ContentStatus;
  isSeo?: boolean;
  date?: any;
  createdAt?: any;
  updatedAt?: any;
  [key: string]: any;
}

export interface SerializedContent {
  id: string;
  contentType: ContentType;
  title?: string;
  slug?: string;
  status?: ContentStatus;
  isSeo?: boolean;
  date: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  [key: string]: any;
}