import { Router } from 'express';
import { noteController } from '../controllers';
import { errorResponse, successResponse } from '../utils';

const router = new Router();

router.get('/note/:noteId', async (req, res) => {
  try {
    const result = await noteController.getOne(req);
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, err);
  }
});

router.post('/note', async (req, res) => {
  try {
    const result = await noteController.create(req);
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, err);
  }
});

router.delete('/note/:noteId', async (req, res) => {
  try {
    const result = await noteController.delete(req);
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, err);
  }
});

export default router;
