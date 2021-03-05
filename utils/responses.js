import {
  equals, forEach, join, length
} from 'ramda';
import { httpCodes } from '../helpers';
import logger from '../logger';

export const checkRequiredFields = (parameters, requiredFields) => {
  forEach((value) => {
    const hasParameter = Object.keys(parameters).includes(value);
    const currentParamValue = parameters[value];
    if (!hasParameter || (hasParameter && equals(length(currentParamValue), 0))) {
      const error = new Error();
      error.code = httpCodes.HTTP_NOT_ACCEPTABLE;
      error.customMessage = `Please, fill required fields. The required fields are: ${join(', ', requiredFields)}.`;
      throw error;
    }
  }, requiredFields);
};

export const errorResponse = (res, err) => {
  const {
    code = httpCodes.HTTP_INTERNAL_SERVER_ERROR,
    message,
    customMessage = 'An error occurred, please try again.',
    fieldsIncorrect,
  } = err;

  if (message) {
    logger.error('Response', message);
  }

  res.status(code).json({
    code,
    message: customMessage,
    fieldsIncorrect,
  });
};

export const successResponse = (res, params) => {
  const {
    code = httpCodes.HTTP_OK,
    message = undefined,
    data = undefined,
  } = params;

  res.status(code).json({
    code,
    message,
    data,
  });
};
