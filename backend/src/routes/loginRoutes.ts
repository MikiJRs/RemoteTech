import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Admin bilgilerini .env dosyasından alıyoruz
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

// Login Route
router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Email ve şifre kontrolü
  if (username === adminEmail && password === adminPassword) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default router;
