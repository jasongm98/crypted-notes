import exceptionsCodes from './codes';
import { generateExceptionClass } from './generateException';

export const NoteException = generateExceptionClass({
  name: 'NoteException',
  codes: exceptionsCodes.note,
});
