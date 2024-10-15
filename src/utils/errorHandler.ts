import { Response } from 'express';
import { logError } from './logUtils';

export const handleError = (res: Response, err: any) => {
  logError(err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
};
