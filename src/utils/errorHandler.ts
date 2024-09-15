import { Response } from 'express';

export const handleError = (res: Response, err: any) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
};
