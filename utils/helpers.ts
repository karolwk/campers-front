import _ from 'lodash';

export const formatPhone = (number: string): string => {
  let newNumber = number.replace(/\D+/g, '');
  if (newNumber.length !== 9) return number;

  newNumber =
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
  // Making sure that there is no
  const uniqeNames = _.uniq(names);

  return uniqeNames.map((name) => {
    return {
      params: {
        id: makeURLfromName(name),
      },
    };
  });
};
