import {
  BOOLEAN, DATE, STRING, TEXT,
} from 'sequelize';
import { database } from '../../config';

const Note = database.define('notes', {
  id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: TEXT,
    allowNull: false,
    required: true,
  },
  notifyEmail: {
    type: STRING(80),
    allowNull: true,
    required: false,
    defaultValue: undefined,
  },
  reference: {
    type: STRING(20),
    allowNull: true,
    required: false,
    defaultValue: undefined,
  },
  deleteOnRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  read: {
    type: BOOLEAN,
    allowNull: false,
    required: true,
    defaultValue: false,
  },
  expirationAt: {
    type: DATE,
    allowNull: false,
  },
}, {
  paranoid: true,
});

export default Note;
