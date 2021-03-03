const express = require("express");

const router = express.Router();

const snowController = require("../libs/controllers/snowController");

router.get("/", (req, res) => {
  res.send("Hello World!! ");
});

router.use("/snow", snowController);

module.exports = router;
