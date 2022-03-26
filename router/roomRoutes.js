const express = require("express");
const router = express.Router();
const { createRoom } = require("../controller/roomController");
const restrict = require("../middleware/restrict");

router.post("/create", restrict, createRoom);

module.exports = router;
