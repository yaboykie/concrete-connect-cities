
// Define types used throughout the application
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

export interface ServiceContent {
  title: string;
  introduction: string;
  benefits: string[];
  mainContent: {
    title: string;
    paragraphs: string[];
    subSections: {
      title: string;
      paragraphs: string[];
    }[];
  };
  whyChoosePro: {
    title: string;
    description: string;
  }[];
  services: Service[];
  testimonials: Testimonial[];
  faqs: FAQ[];
}

export interface ServiceContentMap {
  [key: string]: ServiceContent;
}

// Define UTM parameter interface for tracking
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  form_type?: string;
  page_path?: string;
  landing_url?: string;
  [key: string]: string | undefined;
}

// Define global gtag function for Google Analytics 4
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        [key: string]: any;
      }
    ) => void;
    trackFormConversion?: (
      conversionId: string,
      conversionLabel: string,
      formData: any
    ) => void;
    trackFormInteraction?: (
      action: string,
      formName: string,
      additionalData: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

export {};
