import path from "path";

import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import sharp from "sharp";
import { v4 as uuid } from "uuid";
import appRootPath from "app-root-path";

import { imageSchema } from "../models/validattion";
import { removeImageAfter2min } from "../jobs/jobs";

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files?.image) {
      const err: any = new Error("Please upload image");
      err.statusCode = 401;
      throw err;
    }
    const image = req.files.image as UploadedFile;
    await imageSchema.validate(image, { abortEarly: false });
    const fileName = `${uuid()}_${image.name}`;
    const filePath = path.join(appRootPath.toString(), "uploads", fileName);
    await sharp(image.data)
      .jpeg({ quality: +req.body.quality || 60 })
      .toFile(filePath);
    res.status(201).sendFile(filePath);
    removeImageAfter2min(filePath);
  } catch (err) {
    next(err);
  }
};

export = {
  uploadImage,
};
