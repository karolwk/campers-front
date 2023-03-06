export type Navlinks = { name: string; url: string }[];

// Define a type for the slice state
export interface PageDataState {
  logoURL: string;
  email: string;
  phone: string;
  companyName: string;
  companyaddress: string;
  companyZipCode: string | null;
  companyCity: string | null;
  facebook: string | null;
  instagram: string | null;
  pinterest: string | null;
  twitter: string | null;
}

interface MarKetingIcons {
  iconURL: string;
  title: string;
  description: string;
}

export interface FaqMainPage {
  question: string;
  answer: string;
}

export interface MainPageData {
  title: string;
  description: string;
  icons: MarKetingIcons[];
  teaserTitle: string;
  teaserContent: string;
  campersTitle: string;
  campersDescription: string;
  faq: FaqMainPage[];
}

export interface CamperTechnicals {
  brand: string;
  model: string;
  year: string;
  power: string;
  cylinderCap: string;
  mileage: string;
  fuel: string;
  consumption: string;
  tank: string;
  dimensions: string;
  dimensionsBike: string;
  weight: string;
}

export interface Camper {
  name: string;
  location: string;
  mainImage: string;
  images: string[];
  priceInfo: string;
  description: string;
  genericAmenities: string;
  kitchenAmenities: string;
  usableAmenities: string;
  additionalEquipment: string;
  additionalPriceInfo: string;
  price: {
    price: number;
    sesons: string;
    info: string;
  }[];
  technicals: CamperTechnicals;
  mainAmenities?: MainAmenities[];
}

export type MainAmenities = {
  name: string;
  icon: string;
};

export type StatutPage = {
  metaTitle: string;
  metaDescription: string;
  pagetitle: string;
  pageSubtitle: string;
  mainContent: string;
  faq: {
    answer: string;
    question: string;
  }[];
};

export type PrivacyPage = {
  metaTitle: string;
  metaDescription: string;
  pagetitle: string;
  pageSubtitle: string;
  mainContent: string;
};
