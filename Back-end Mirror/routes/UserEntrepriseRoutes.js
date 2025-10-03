const express = require("express")
const router = express.Router()
const {authUserEntreprise,createUserEntreprise} = require("../controllers/UserEntrepriseController")

router.post("/create",createUserEntreprise)
router.post("/authentification",authUserEntreprise)

module.exports = router