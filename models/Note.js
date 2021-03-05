import { exceptionsCodes, NoteException } from '../exceptions';
import { Note } from './schemas';

const getOneNoteById = id => Note.findOne({
  where: {
    id,
  }
});

const insertNote = ({
  id,
  message,
  reference,
  notifyEmail,
  deleteOnRead,
  expirationAt,
}) => Note.create({
  id,
  message,
  reference,
  notifyEmail,
  deleteOnRead,
  expirationAt,
});

const updateNote = ({
  id, read
}) => Note.update({
  read
}, {
  where: {
    id,
  }
});

const deleteNote = id => Note.destroy({
  where: {
    id,
  }
});

const verifyExistId = async (id) => {
  const result = await Note.count({
    where: {
      id,
    },
  });

  if (result === 0) {
    throw new NoteException(exceptionsCodes.note.NOT_EXIST_IDENTIFIER);
  }
};

export default {
  getOneNoteById,
  insert: insertNote,
  update: updateNote,
  delete: deleteNote,
  verifyExistId,
};
