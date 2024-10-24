import express, { Request, Response } from 'express';
import { PORT, MONGODB_URI } from './config';
import mongoose from 'mongoose';
import cors from 'cors';
import { createQuestionPackage, getAllQuestionPackages, deleteQuestionPackage, updateQuestionPackage } from './controllers/QuestionPackageController';
import loginRoutes from './routes/loginRoutes';
import interviewRoutes from './routes/interviewRoutes'; // Interview routes'u import ettik
import adminMiddleware from './middlewares/adminMiddleware'; // Admin middleware'i import ettik

const app = express();

// CORS ayarları ekle
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL'sini burada belirtin
  credentials: true // Credentials kullanımını etkinleştir
}));

// MongoDB'ye bağlan
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Body'yi parse etmek için JSON desteği ekle
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hoşgeldin, TypeScript ile Express.js sunucu çalışıyor!');
});

// Yeni bir QuestionPackage oluşturmak için POST isteği (Sadece adminler)
app.post('/api/question-package', createQuestionPackage);

// Tüm QuestionPackage verilerini almak için GET isteği (Herkes erişebilir)
app.get('/api/question-packages', getAllQuestionPackages);

// Belirli bir QuestionPackage'i ID ile silmek için DELETE isteği (Sadece adminler)
app.delete('/api/question-package/:id', deleteQuestionPackage);

// Belirli bir QuestionPackage'i ID ile güncellemek için PUT isteği (Sadece adminler)
app.put('/api/question-package/:id', updateQuestionPackage);

// Interview routes'u ekliyoruz
app.use('/api', interviewRoutes); // Interview rotalarını /api altında kullan

// Login route
app.use('/api', loginRoutes);

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor`);
});
