export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LeadRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'IN_PROGRESS'
  | 'CONVERTED'
  | 'REJECTED';