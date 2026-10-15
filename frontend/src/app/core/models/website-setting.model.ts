export interface WebsiteSetting {
  id: number;
  agencyName: string;
  tagline: string | null;
  logoUrl: string | null;
  contactEmail: string | null;
  phone: string | null;
  address: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
  defaultMetaTitle: string | null;
  defaultMetaDescription: string | null;
  footerText: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteSettingRequest {
  agencyName: string;
  tagline: string;
  logoUrl: string;
  contactEmail: string;
  phone: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  footerText: string;
}