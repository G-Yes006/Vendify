import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const generateToken = (payload: object): string => {
  return {
    id: payload.userId,
    token: jwt.sign(payload, secret, { expiresIn: '24h' }),
  };
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
