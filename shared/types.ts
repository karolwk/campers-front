export type Navlinks = { name: string; url: string }[];

// Define a type for the slice state
export interface FooterState {
  logoURL: string;
  email: string;
  phone: string;
  companyName: string;
  companyaddress: string;
  facebook: string | null;
  instagram: string | null;
  pinterest: string | null;
  twitter: string | null;
}
