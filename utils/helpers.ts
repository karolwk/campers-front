import uniq from 'lodash/uniq';
import { BlogEntry } from '../shared/types';

export const formatPhone = (number: string, nospace = false): string => {
  // leaves only numbers
  let newNumber = number.replace(/\D+/g, '');
  if (newNumber.length !== 9) return number;

  newNumber =
    '+48 ' +
    newNumber.substring(0, 3) +
    ' ' +
    newNumber.substring(3, 6) +
    ' ' +
    newNumber.substring(6, 9);
  if (nospace) {
    return newNumber.replaceAll(' ', '');
  }
  return newNumber;
};

// normalizer to enter only numbers in form
export const normalizeToInt = (value: string) => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, '');
  return Number.parseInt(onlyNums);
};

// helper function to convert image src path to Google Cloud Storage address
export const formatPathtoGCS = (path: string): string => {
  const bucket =
    'https://firebasestorage.googleapis.com/v0/b/kampery-kamil-cms.appspot.com/o/';
  const encodedPath = path.replace('/', '%2F');

  return bucket + encodedPath + '?alt=media';
};

export const makeURLfromName = (name: string): string => {
  return name.trim().toLowerCase().replace(/ /g, '-');
};

// make params array for getStaticPaths, from array of strings

export const makeURLPaths = (
  names: string[]
): {
  params: {
    id: string;
  };
}[] => {
  // Making sure that there is no duplicates
  const uniqeNames = uniq(names);

  return uniqeNames.map((name) => {
    return {
      params: {
        id: makeURLfromName(name),
      },
    };
  });
};

// Helper function used to return an array of amenities from string
export const splitAmenities = (amenities: string) => {
  // Split the string using a regular expression that matches commas outside of parentheses
  const substrings = amenities.split(/(?!\([^)]*),(?![^(]*\))/g);

  // Trim each substring and return result

  return substrings.map((substring) => substring.trim());
};

// Sorting blogposts in date order from newest to oldest
export const sortBlogPosts = (objectsArray: BlogEntry[]) => {
  return objectsArray.sort(
    (a, b) => b.created_on.seconds - a.created_on.seconds
  );
};

// Make polish date format from timestamp
export const makeDateFromTimeStamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;
  return date.toLocaleDateString('pl-PL', options);
};

// Return slice of Array containing specified size of elements for page

export function paginate(array: any[], pageSize: number, pageNumber: number) {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

// Cutting text to match 160 chars

export function cutText(text: string): string {
  if (text.length <= 160) {
    return text;
  }
  const shortenedText = text.slice(0, 160);
  const lastSpaceIndex = shortenedText.lastIndexOf(' ');
  if (lastSpaceIndex !== -1) {
    return shortenedText.slice(0, lastSpaceIndex) + '...';
  }
  return shortenedText + '...';
}

// Testing function
export function getRandomDateInYear(year: number) {
  const start = new Date(year, 0, 1); // January 1st of the specified year
  const end = new Date(year + 1, 0, 1); // January 1st of the following year
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return Math.floor(randomTime / 1000); // convert milliseconds to seconds
}
