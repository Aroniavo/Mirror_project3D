const express = require("express")
const router  = express.Router()
const {getAllEntretien,createEntrt} = require("../controllers/EntretienController")
const authenticateToken = require("../middleware/authentification")

router.get("/allEntretien",authenticateToken,getAllEntretien)
router.post("/createEntretien",authenticateToken,createEntrt)