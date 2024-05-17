import { Router, Request, Response } from "express";

import { upload, getImage } from "../controllers/controller.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(201).json("Hello my sweetie");
});

router.get("/:imageName", getImage);

router.post("/upload", upload);

export default router;
