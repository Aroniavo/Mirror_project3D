const express = require("express");
const authenticateToken = require("../middleware/authentification");
const router = express.Router();
const {
  registerUser,
  loginController,
} = require("../controllers/UserController");

router.post("/register", registerUser);
router.post("/login", loginController);

module.exports = router;
