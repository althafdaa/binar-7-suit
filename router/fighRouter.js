const express = require("express");
const router = express.Router();
const {
  checkRoom,
  checkPlayer,
  checkChoice,
  playGame,
} = require("../controller/random");
const restrict = require("../middleware/restrict");

router.post("/fight/:roomName", restrict, playGame);

module.exports = router;
