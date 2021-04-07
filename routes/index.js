const express = require("express");

const router = express.Router();

const snowController = require("../libs/controllers/snowController");

router.get("/", (req, res) => {
  res.send("Hello World!! ");
});

router.post("/callback", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

router.use("/snow", snowController);

module.exports = router;
