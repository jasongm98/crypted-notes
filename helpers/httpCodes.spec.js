import { httpCodes, getHttpMessage } from './httpCodes';

describe('httpCodes', () => {
  it('getHttpMessage', () => {
    expect(getHttpMessage(httpCodes.HTTP_CONTINUE)).toBe('Continue');
  });
});
