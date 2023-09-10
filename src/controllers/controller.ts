import path from "path";
import fs from "fs";

import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import sharp from "sharp";
import { v4 as uuid } from "uuid";
import appRootPath from "app-root-path";

import { imageSchema } from "../models/validattion";
import { removeImageAfter1min } from "../jobs/jobs";

const getImage = (req: Request, res: Response, next: NextFunction) => {
  if (
    fs.existsSync(
      path.join(appRootPath.toString(), "uploads", req.params.imageName)
    )
  ) {
    res
      .status(200)
      .sendFile(
        path.join(appRootPath.toString(), "uploads", req.params.imageName)
      );
  } else {
    const err: any = new Error("Image is not found");
    err.statusCode = 404;
    next(err);
  }
};

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
    res.status(201).json(`${process.env.SERVER_URL}/${fileName}`);
    removeImageAfter1min(filePath);
  } catch (err) {
    next(err);
  }
};

export = {
  getImage,
  uploadImage,
};
