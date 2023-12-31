import { Router, Request, Response } from "express";

import controller from "../controllers/controller";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

router.get("/:imageName", controller.getImage);

router.post("/upload", controller.uploadImage);

export default router;
