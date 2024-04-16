import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { routes } from './app/routes';

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://autox-frontend.vercel.app'],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1', routes);

// Global Error Handler
app.use(globalErrorHandler);

// Test Route
app.get('/test', async (req: Request, res: Response) => {
  res.json('The AutoX server is on 🔥 💧 🔥');
});

// Handle Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found!',
    errorMessages: [{ path: req.originalUrl, message: 'API Not Found!' }],
  });

  next();
});

export default app;
