const express = require("express");
const authenticateToken = require("../middleware/authentification");
const router = express.Router();
const {
  registerUser,
  loginController,
  getUserProfile,
} = require("../controllers/UserController");

router.post("/register", registerUser);
router.post("/login", loginController);
router.get("/me", getUserProfile);

module.exports = router;
