import { Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const adminMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res
      .status(403)
      .json({ message: 'Access denied - no user information' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only.' });
  }

  next();
};
