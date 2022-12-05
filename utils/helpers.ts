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

export const formatPathtoGCS = (path: string): string => {
  // helper function to convert image src path to Google Cloud Storage address

  const bucket =
    'https://firebasestorage.googleapis.com/v0/b/kampery-kamil-cms.appspot.com/o/';
  const encodedPath = path.replace('/', '%2F');

  return bucket + encodedPath + '?alt=media';
};
