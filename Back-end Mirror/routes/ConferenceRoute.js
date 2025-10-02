const express = require("express")
const router = express.Router()
const {getAllConf,getConfById,createConf}=require("../controllers/ConferenceController")
const authenticateToken = require("../middleware/authentification")


router.get('/allconference',authenticateToken,getAllConf)
router.post('/createConf',authenticateToken,createConf)

module.exports = router;