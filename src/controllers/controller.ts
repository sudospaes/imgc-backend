import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import { v4 as uuid } from "uuid";
import { UploadedFile } from "express-fileupload";
import appRootPath from "app-root-path";

import { join } from "path";
import fs from "fs";

import imageSchema from "../models/vaildation.js";
import { removeImageAfter1min } from "../utils/jobs.js";

export async function getImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const existStatus: boolean = fs.existsSync(
    join(appRootPath.toString(), "uploads", req.params.imageName)
  );
  if (existStatus) {
    res
      .status(200)
      .sendFile(join(appRootPath.toString(), "uploads", req.params.imageName));
  } else {
    const err: any = new Error("Image is not found");
    err.statusCode = 404;
    next(err);
  }
}

export async function upload(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.files?.image) {
      const err: any = new Error("Please upload image");
      err.statusCode = 401;
      throw err;
    }
    const image = req.files.image as UploadedFile;
    await imageSchema.validate(image, { abortEarly: false });
    const fileName = `${uuid()}_${image.name}`;
    const filePath = join(appRootPath.toString(), "uploads", fileName);
    await sharp(image.data)
      .jpeg({ quality: +req.body.quality || 60 })
      .toFile(filePath);
    res.status(201).json(`localhost:3000/${fileName}`);
    removeImageAfter1min(filePath);
  } catch (err) {
    next(err);
  }
}
