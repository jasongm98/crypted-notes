import { generate as generatePassword } from 'generate-password';
import moment from 'moment';
import { equals, length, split } from 'ramda';
import short from 'short-uuid';
import { exceptionsCodes, NoteException } from '../exceptions';
import { NoteModel } from '../models';
import {
  checkRequiredFields, decryptAES, decryptBase64, encryptAES, encryptBase64
} from '../utils';

const { note: noteCodes } = exceptionsCodes;

const getOneNote = async (req) => {
  const { noteId } = req.params;
  const noteParams = split('@', noteId);
  const translator = short();
  const id = translator.toUUID(noteParams[0]);

  await NoteModel.verifyExistId(id);

  if (equals(length(noteParams), 1)) {
    throw new NoteException(noteCodes.INVALID_URL);
  }

  const note = await NoteModel.getOneNoteById(id);

  const password = decryptBase64(noteParams[1]);

  let message;
  if (note) {
    message = await decryptAES(note.get('message'), password);
    if (message.length !== 0) {
      if (note.get('deleteOnRead')) {
        await NoteModel.delete(id);
      } else {
        await NoteModel.update({
          id,
          read: true
        });
      }
    } else {
      throw new NoteException(noteCodes.INVALID_PASSWORD);
    }
  }

  return {
    data: {
      message,
      read: note.read,
      createdAt: note.createdAt,
      expirationAt: note.expirationAt
    },
  };
};

const createNote = async (req) => {
  const {
    message, password, confirmPassword, expiration, notificationEmail, reference,
  } = req.body;

  checkRequiredFields(req.body, [
    'message'
  ]);

  if (!equals(password, confirmPassword)) {
    throw new NoteException(noteCodes.PASSWORDS_NOT_MATCH);
  }

  const translator = short();
  const generatedId = translator.generate();

  const encryptPass = password || await generatePassword();
  let link = `${req.protocol}://${req.get('host')}/view/${generatedId}`;
  if (!password) {
    const encryptPassBase64 = await encryptBase64(encryptPass);
    link += `@${encryptPassBase64}`;
  }

  const insertedNote = await NoteModel.insert({
    id: translator.toUUID(generatedId),
    message: encryptAES(message, encryptPass),
    expirationAt: moment().add(expiration, 'hours'),
    deleteOnRead: expiration && parseInt(expiration, 10) === 0,
    notifyEmail: notificationEmail,
    reference,
  });

  const note = await NoteModel.getOneNoteById(insertedNote.id);
  return {
    message: noteCodes.getMessage(noteCodes.CREATE_SUCCESS),
    data: {
      link,
      createdAt: note.createdAt,
      expirationAt: note.expirationAt,
    }
  };
};

const deleteNote = async (req) => {
  const { noteId } = req.params;

  await NoteModel.verifyExistId(noteId);

  await NoteModel.delete(noteId);

  return {
    message: noteCodes.getMessage(noteCodes.DELETE_SUCCESS),
  };
};

export default Object.freeze({
  getOne: getOneNote,
  create: createNote,
  delete: deleteNote,
});
