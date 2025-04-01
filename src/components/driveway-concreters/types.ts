
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
  googleMapEmbed: string | null;
  schemaData: any;
  metaDescription: string;
}

// Interface for database location data
export interface LocationData {
  city: string | null;
  state: string | null;
  state_abbreviation: string | null;
  full_name: string | null;
  service: string | null;
  latitude: number | null;
  longitude: number | null;
  meta_description: string | null;
  schema_data: any;
}
