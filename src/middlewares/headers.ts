import { NextFunction, Request, Response } from "express";

const setHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.ORIGIN}`);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.setHeader("X-Powered-By", "Nothing");
  next();
};

export default setHeaders;
