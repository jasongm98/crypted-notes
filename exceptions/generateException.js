import { forEachObjIndexed } from 'ramda';
import { httpCodes } from '../helpers';

const generateCodes = (codesName) => {
  const generatedCodes = {};
  forEachObjIndexed(
    (codeName, key) => {
      generatedCodes[codeName] = parseInt(key, 10);
    },
    codesName,
  );

  return Object.freeze({ ...generatedCodes });
};

export const generateExceptionCodes = (data) => {
  const codes = Object.keys(data);
  const messages = Object.values(data);

  return Object.freeze({
    ...generateCodes(codes),
    getMessage: code => messages[code],
  });
};

export const generateExceptionClass = ({
  name, httpCode = httpCodes.HTTP_CONFLICT, codes,
}) => class extends Error {
  constructor(message) {
    super();
    this.name = name;
    this.code = httpCode;
    this.customMessage = codes.getMessage(message);
  }
};
