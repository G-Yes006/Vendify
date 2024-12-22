import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const secret = process.env.JWT_SECRET;

interface Payload {
  userId: string;
  [key: string]: any;
}

export const generateToken = (
  payload: Payload
): { id: string; token: string } => {
  return {
    id: payload.userId,
    token: jwt.sign(payload, secret, { expiresIn: '24h' }),
  };
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
