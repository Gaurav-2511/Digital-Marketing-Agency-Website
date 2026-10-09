export interface Testimonial {
  id: number;
  clientName: string;
  clientRole: string;
  companyName: string;
  content: string;
  rating: number;
  imageUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface TestimonialRequest {
  clientName: string;
  clientRole: string;
  companyName: string;
  content: string;
  rating: number;
  imageUrl: string;
  active: boolean;
}