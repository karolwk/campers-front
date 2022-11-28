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
