import { PageDataState, FaqMainPage, Camper, MainAmenities } from './types';

export const mockPageDataState: PageDataState = {
  logoURL: 'https://example.com/logo.png',
  email: 'test@example.com',
  phone: '123456789',
  companyName: 'Mock Company',
  companyaddress: '123 Mock Address',
  companyZipCode: '12345',
  companyCity: 'Mock City',
  facebook: 'https://facebook.com/mock',
  instagram: 'https://instagram.com/mock',
  pinterest: 'https://pinterest.com/mock',
  twitter: 'https://twitter.com/mock',
};

export const mockMarketingIcons = [
  {
    iconURL: 'https://example.com/icon1.png',
    title: 'Icon 1',
    description: 'Icon 1 Description',
  },
  {
    iconURL: 'https://example.com/icon2.png',
    title: 'Icon 2',
    description: 'Icon 2 Description',
  },
];

export const mockFaqMainPage: FaqMainPage[] = [
  {
    question: 'Question 1',
    answer: 'Answer 1',
  },
  {
    question: 'Question 2',
    answer: 'Answer 2',
  },
];

export const mockCamper = {
  name: 'Mock Camper',
  location: 'Mock Location',
  mainImage: 'https://example.com/camper.png',
  images: [
    'https://example.com/camper1.png',
    'https://example.com/camper2.png',
  ],
  priceInfo: 'Price Info',
  description: 'Description',
  genericAmenities: 'Generic Amenities',
  kitchenAmenities: 'Kitchen Amenities',
  usableAmenities: 'Usable Amenities',
  additionalEquipment: 'Additional Equipment',
  additionalPriceInfo: 'Additional Price Info',
  price: [
    {
      price: 100,
      sesons: 'Season 1',
      info: 'Info 1',
    },
    {
      price: 200,
      sesons: 'Season 2',
      info: 'Info 2',
    },
  ],
  technicals: {
    brand: 'Brand',
    model: 'Model',
    year: 'Year',
    power: 'Power',
    cylinderCap: 'Cylinder Cap',
    mileage: 'Mileage',
    fuel: 'Fuel',
    consumption: 'Consumption',
    tank: 'Tank',
    dimensions: 'Dimensions',
    dimensionsBike: 'Dimensions Bike',
    weight: 'Weight',
  },
  mainAmenities: [
    {
      name: 'Amenity 1',
      icon: 'Icon 1',
    },
    {
      name: 'Amenity 2',
      icon: 'Icon 2',
    },
  ],
};

export const mockMainAmenities: MainAmenities[] = [
  {
    name: 'Amenity 1',
    icon: 'Icon 1',
  },
  {
    name: 'Amenity 2',
    icon: 'Icon 2',
  },
];

export const mockIcons = [
  {
    name: 'Icon 1',
    iconPath: 'https://example.com/icon1.png',
  },
  {
    name: 'Icon 2',
    iconPath: 'https://example.com/icon2.png',
  },
];
