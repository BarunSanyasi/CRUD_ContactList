import jwt from 'jsonwebtoken';
import { Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req: Request) => {
  const token = req.headers.authorization || '';
  if (!token) return { user: null };

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    return { user };
  } catch {
    return { user: null };
  }
};

