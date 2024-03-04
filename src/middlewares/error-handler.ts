import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { SupabaseStorageExceptions } from '../Exceptions/SupabaseStorageExceptions';

export const errorHandler: ErrorRequestHandler = function (error: Error, req: Request, res: Response, next: NextFunction) {
  if (error.message.includes('ffmpeg') || error instanceof SupabaseStorageExceptions) {
    return res.status(500).json({ error: error.message });
  }
};
