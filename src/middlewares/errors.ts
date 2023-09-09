import { Response, NextFunction, Request } from "express";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = error.statusCode || 500;
  const message: string = error.message;
  res.status(status).json({ message });
};

export default errorHandler;
