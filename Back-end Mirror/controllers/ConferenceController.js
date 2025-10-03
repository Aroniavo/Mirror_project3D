const {
  getAllConference,
  getConferenceByCompany,
  getConferenceByUser,
  createConference,
} = require("../services/ConferenceService");
const nanoid = require("nanoid");
const { v4: uuid } = require("uuid");

async function getAllConf(req, res, next) {
  try {
    const user = req.user;

    if (user.role === "candidat") {
      return res.status(403).json({
        message: "Accès interdit",
      });
    }

    const allConferences = await getAllConference();
    res.status(200).json({
      conferences: allConferences,
    });
  } catch (error) {
    next(error);
  }
}

async function createConf(req, res, next) {
  try {
    if (req.user.role === "candidat") {
     return res.status(403).json({
        message: "Autorisation non accordée"
      })
    }
    
    // Générer un lien unique pour la conférence
    const lien = "https://meet.jit.si/conf-" + uuid();
    const id_user = req.user.id;

    const data = {
      ...req.body,
      lien_conference: lien,
      id_user: id_user,
    };

    const newConf = await createConference(data);
    res.status(201).json({
      message: "Conférence créée avec succès",
      conference: {
        id_conference: newConf.id_conference,
        name_company: newConf.name_company,
        date_conference: newConf.date_conference,
        lien_conference: newConf.lien_conference
      }
    });
  } catch (error) {
    next(error);
  }
}



module.exports = { getAllConf, createConf };
