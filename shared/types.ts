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

interface FaqMainPage {
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
