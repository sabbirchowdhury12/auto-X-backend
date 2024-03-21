import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (func: RequestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
