export interface Portfolio {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  clientName: string;
  category: string;
  imageUrl: string;
  projectUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioRequest {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  clientName: string;
  category: string;
  imageUrl: string;
  projectUrl: string;
  active: boolean;
}