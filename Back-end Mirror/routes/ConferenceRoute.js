const express = require("express")
const router = express.Router()
const {getAllConf, createConf}=require("../controllers/ConferenceController")
const authenticateToken = require("../middleware/authentification")

// GET /api/conferences - Récupérer toutes les conférences
router.get('/allConference', authenticateToken, getAllConf)

// POST /api/conferences - Créer une nouvelle conférence
router.post('/createConf', authenticateToken, createConf)



module.exports = router;