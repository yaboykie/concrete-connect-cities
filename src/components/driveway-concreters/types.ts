
export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface LocationContentType {
  title: string;
  serviceIntro: string;
  weatherConsiderations: string;
  faqs: FAQ[];
  services: Service[];
  testimonials: Testimonial[];
  fullLocation: string;
  latitude: number | null;
  longitude: number | null;
  schemaData: any;
  metaDescription: string;
}
