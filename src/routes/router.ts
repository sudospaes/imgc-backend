import { Router, Request, Response } from "express";

import { upload, getImage } from "../controllers/controller.js";

const router = Router();

router.get("/api/", (req: Request, res: Response) => {
  res.status(201).json("Hello my sweetie");
});

router.get("/api/:imageName", getImage);

router.post("/api/upload", upload);

export default router;
