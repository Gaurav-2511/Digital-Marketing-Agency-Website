
export type ConsultationStatus =
  | 'REQUESTED'
  | 'CONTACTED'
  | 'SCHEDULED'
  | 'COMPLETED'
  | 'CANCELLED';

export type MeetingType = 'ONLINE' | 'PHONE' | 'IN_PERSON';

export interface Consultation {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  message: string | null;
  preferredDateTime: string;
  meetingType: MeetingType;
  status: ConsultationStatus;
  scheduledAt: string | null;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ConsultationStatusUpdateRequest {
  status: ConsultationStatus;
}

export interface ConsultationScheduleRequest {
  scheduledAt: string;
  adminNotes?: string;
}
