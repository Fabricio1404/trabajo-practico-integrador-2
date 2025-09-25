import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import { connectDatabase } from './src/config/database.js';

const app = express();

// Middlewares base
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


const allowedOrigin = process.env.CORS_ORIGIN ;
app.use(cors({ origin: allowedOrigin, credentials: true }));

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;

connectDatabase(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
});
