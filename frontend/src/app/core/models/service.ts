export interface Service {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string | null;
  imageUrl: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}