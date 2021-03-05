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

export default {
  getOneNoteById,
  insert: insertNote,
  update: updateNote,
  delete: deleteNote,
};
