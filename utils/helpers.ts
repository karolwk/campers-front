import uniq from 'lodash/uniq';

export const formatPhone = (number: string): string => {
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
  return newNumber;
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
