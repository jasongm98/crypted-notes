import { generateExceptionCodes } from './generateException';

const noteExceptionCodes = generateExceptionCodes({
  NOT_EXIST_IDENTIFIER: 'This note was read and destroyed.',
  INVALID_URL: 'You have entered an invalid URL.',
  REQUIRED_PASSWORD: 'Please, fill the required field: password',
  INVALID_PASSWORD: 'You have entered an invalid password.',
  PASSWORDS_NOT_MATCH: 'Passwords do not match, please re-enter them.',
  CREATE_SUCCESS: 'Note created successfully.',
  DELETE_SUCCESS: 'Note deleted successfully.',
});

export default Object.freeze({
  note: noteExceptionCodes,
});
