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
