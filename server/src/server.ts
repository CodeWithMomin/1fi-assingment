/**
 * 1Fi Marketplace — Express API Server
 */

import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load .env from server root  (__dirname = server/src, so ../ goes to server/)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log(' MONGODB_URI loaded:', process.env.MONGODB_URI ? 'YES' : 'NO — check .env path!');

import productRoutes from './routes/products';
import emiPlanRoutes from './routes/emiPlans';
import orderRoutes from './routes/orders';

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/1fi-marketplace';

// ─── Middleware ────────────────────────────────────────────────────────────────

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ──────────────────────────────────────────────────────────────

app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ────────────────────────────────────────────────────────────────

app.use('/api/products', productRoutes);
// Nested: /api/products/:productId/emi-plans
app.use('/api/products/:productId/emi-plans', emiPlanRoutes);
app.use('/api/orders', orderRoutes);

// 404 fallthrough
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ──────────────────────────────────────────────────────

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error]', err.message);

  // Mongoose cast / validation errors
  if (err.name === 'CastError') {
    res.status(400).json({ success: false, message: 'Invalid ID format' });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(422).json({ success: false, message: err.message });
    return;
  }

  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ─── Database + Start ──────────────────────────────────────────────────────────

async function start() {
  try {
    console.log(' Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log(' MongoDB connected');

    app.listen(PORT, () => {
      console.log(`1Fi Marketplace API running on http://localhost:${PORT}`);
      console.log(`   Health: http://localhost:${PORT}/health`);
      console.log(`   Products: http://localhost:${PORT}/api/products`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
