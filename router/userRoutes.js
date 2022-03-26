const express = require("express");
const router = express.Router();
const {
  loginAccount,
  registerAccount,
} = require("../controller/userController");

router.get("/", (req, res) => {
  res.status(200).json({ message: "conencted" });
});

router.post("/register", registerAccount);
router.post("/login", loginAccount);

module.exports = router;
