export interface Blog {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  featuredImage: string;
  author: string;
  published: boolean;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  createdAt: string;
  updatedAt: string;
}



export interface BlogRequest {
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  featuredImage: string;
  author: string;
  published: boolean;
  categoryId: number;
}
