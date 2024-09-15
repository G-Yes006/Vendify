import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
