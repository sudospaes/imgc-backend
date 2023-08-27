const { Router } = require("express");

const controller = require("../controllers/controller");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

router.get("/image/:filename", controller.getImage);

//? Form Data => "req.files.image" for image and "req.body.quality"(optional)
router.post("/upload", controller.uploadImage);

router.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = router;
