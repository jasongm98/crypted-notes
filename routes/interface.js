import { enc } from 'crypto-js';
import { Router } from 'express';
import moment from 'moment';
import { equals, length, split } from 'ramda';
import { noteController } from '../controllers';
import { exceptionsCodes, NoteException } from '../exceptions';

const router = new Router();

const { note: noteCodes } = exceptionsCodes;

router.get('/', (req, res) => {
  res.redirect('/send');
});

router.get('/send', (req, res) => {
  res.render('send', {
    csrfToken: req.csrfToken(),
    note: {
      message: '',
      expiration: '',
      notificationEmail: '',
      reference: '',
    }
  });
});

router.post('/send', async (req, res) => {
  const {
    message, expiration, notificationEmail, reference,
  } = req.body;

  try {
    const { data: response } = await noteController.create(req);
    res.render('generated', {
      title: 'Note link ready',
      link: response.link,
      expiration: (parseInt(expiration, 10) === 0)
        ? 'after reading it'
        : moment(response.expirationAt).from(moment())
    });
  } catch (error) {
    res.render('send', {
      csrfToken: req.csrfToken(),
      error: {
        type: 'danger',
        message: error.customMessage || 'An error occurred, please try again.',
        close: true,
      },
      note: {
        message,
        expiration,
        notificationEmail,
        reference,
      }
    });
  }
});

router.get('/view/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const noteParams = split('@', noteId);
  const result = {
    title: 'Note contents',
    noteId: noteParams[0],
  };

  try {
    const { data: note } = await noteController.getOne(req);

    res.render('view', {
      ...result,
      note: note.message,
      expiration: equals(note.createdAt, note.expirationAt)
        ? 'after reading it'
        : moment(note.expirationAt).from(moment())
    });
  } catch (error) {
    if (equals(noteCodes.getMessage(noteCodes.INVALID_URL), error.customMessage)) {
      res.render('unlock', {
        ...result,
        csrfToken: req.csrfToken(),
        note: {
          id: noteParams[0],
          password: ''
        }
      });
      return;
    }

    const isNoteExist = equals(
      noteCodes.getMessage(noteCodes.NOT_EXIST_IDENTIFIER), error.customMessage
    );

    res.render('view', {
      ...result,
      error: {
        type: isNoteExist ? 'info' : 'danger',
        message: error.customMessage || 'An error occurred, please try again.',
        close: !isNoteExist,
      }
    });
  }
});

router.post('/view/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const { password } = req.body;
  try {
    if (!password || equals(length(password), 0)) {
      throw new NoteException(noteCodes.REQUIRED_PASSWORD);
    }

    let encryptPassBase64 = '';
    try {
      encryptPassBase64 = enc.Base64.stringify(
        enc.Utf8.parse(password)
      );
    } catch (error) {
      throw new NoteException(noteCodes.INVALID_PASSWORD);
    }

    res.redirect(`/view/${noteId}@${encryptPassBase64}`);
  } catch (error) {
    res.render('unlock', {
      title: 'Note contents',
      csrfToken: req.csrfToken(),
      error: {
        type: 'danger',
        message: error.customMessage || 'An error occurred, please try again.',
        close: true,
      },
      note: {
        id: req.params.noteId,
        password: ''
      }
    });
  }
});

export default router;
