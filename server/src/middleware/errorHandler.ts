import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const createError = (message: string, statusCode: number = 500): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

export const errorHandler = (
  error: AppError | MongoError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let details: any = undefined;

  // Handle operational errors
  if ('statusCode' in error && error.statusCode) {
    statusCode = error.statusCode;
    message = error.message;
  }
  
  // Handle MongoDB errors
  else if ('code' in error) {
    const mongoError = error as MongoError;
    
    switch (mongoError.code) {
      case 11000: // Duplicate key error
        statusCode = 409;
        message = 'Resource already exists';
        details = 'A record with this information already exists';
        break;
      case 121: // Document validation error
        statusCode = 400;
        message = 'Validation Error';
        details = mongoError.message;
        break;
      default:
        statusCode = 500;
        message = 'Database Error';
        details = process.env.NODE_ENV === 'development' ? mongoError.message : undefined;
    }
  }
  
  // Handle validation errors
  else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    details = error.message;
  }
  
  // Handle JWT errors
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }
  
  else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }
  
  // Handle cast errors (invalid ObjectId)
  else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Log error for debugging
  if (statusCode >= 500) {
    console.error('Server Error:', {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString()
    });
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
    ...(process.env.NODE_ENV === 'development' && statusCode >= 500 && { 
      stack: error.stack 
    })
  });
};