import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Authorization başlığından token'i al
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    // Token'i doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Kullanıcının admin olup olmadığını kontrol et (decoded verisini kontrol edebiliriz)
    if (typeof decoded === 'object' && decoded.role === 'admin') {
      next(); // Kullanıcı admin, işlemi devam ettir
    } else {
      return res.status(403).json({ message: 'Access forbidden: Admins only.' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid.' });
  }
};

export default adminMiddleware;
