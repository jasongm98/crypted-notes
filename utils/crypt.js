import { AES, enc } from 'crypto-js';
import { httpCodes } from '../helpers';

export const encryptAES = (data, password) => {
  if (!password) {
    const error = new Error();
    error.code = httpCodes.HTTP_NOT_ACCEPTABLE;
    error.customMessage = 'Please add your password to the config.';
  }

  return AES.encrypt(data, password).toString();
};

export const decryptAES = (data, password) => {
  if (!password) {
    const error = new Error();
    error.code = httpCodes.HTTP_NOT_ACCEPTABLE;
    error.customMessage = 'Please add your password to the config.';
  }

  return AES.decrypt(data, password).toString(enc.Utf8);
};

export const encryptBase64 = data => enc.Base64.stringify(
  enc.Utf8.parse(data)
);

export const decryptBase64 = data => enc.Utf8.stringify(
  enc.Base64.parse(data)
);
