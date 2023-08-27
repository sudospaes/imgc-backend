const path = require("path");
const fs = require("fs");

const sharp = require("sharp");
const shortId = require("short-id");
const appRootPath = require("app-root-path").toString();

const { imageSchema } = require("../models/validation");
const jobs = require("../jobs/jobs");

const getImage = (req, res, next) => {
  if (fs.existsSync(path.join(appRootPath, "uploads", req.params.filename))) {
    res
      .status(200)
      .sendFile(path.join(appRootPath, "uploads", req.params.filename));
  } else {
    const err = new Error("Image is not found");
    err.statusCode = 404;
    next(err);
  }
};

const uploadImage = async (req, res, next) => {
  try {
    if (!req.files.image) {
      const err = new Error("Please upload image");
      err.statusCode = 401;
      throw err;
    }
    await imageSchema.validate(req.files.image, { abortEarly: false });
    const fileName = `${shortId.generate()}_${req.files.image.name}`;
    const filePath = path.join(appRootPath, "uploads", fileName);
    await sharp(req.files.image.data)
      .jpeg({ quality: +req.body.quality || 60 }) //? +req.body.quality ==> this same with parseInt(req.body.quality)
      .toFile(filePath);
    const link = `${process.env.SERVER_URL}/image/${fileName}`;
    res.status(201).json({ link });
    jobs.removeImageAfter2min(filePath);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getImage,
  uploadImage,
};
