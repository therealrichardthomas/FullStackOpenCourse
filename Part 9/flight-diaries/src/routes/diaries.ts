import express, { Request, Response, NextFunction } from 'express';
import diaryService from '../services/diaryService';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';
import { NewEntrySchema } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

// Request is a generic; the third parameter is type of the request's body (which we want as NewDiaryEntry)
router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
  // after the request passes the newDiaryParser, it is KNOWN that the request body is a proper NewDiaryEntry
  const addedEntry = diaryService.addDiary(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;