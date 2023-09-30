import countryOptions from '../data/countries.json';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+[^\+]*$/;
const nameRegex = /^[a-z\s]+$/i;

export const ERROR_TYPES = {
  INVALID: "Invalid",
  EMPTY: "Empty"
}

export default function validateObject(id, key, value) {
  let error = {id: id};

  if (!value.length) {
    error.type = ERROR_TYPES.EMPTY;
    error.key = key;
    return error;
  }

  let errorFlag = false;

  switch (key) {
    case 'name':
      errorFlag = !nameRegex.test(value.toLowerCase());
      break;
    case 'country':
      errorFlag = !countryOptions.includes(value);
      break;
    case 'email':
      errorFlag = !emailRegex.test(value);
      break;
    case 'phone':
      errorFlag = !phoneRegex.test(value);
      break;
  }

  if (errorFlag) {
    error.type = ERROR_TYPES.INVALID;
    error.key = key;
    return error;
  }
  return;
}