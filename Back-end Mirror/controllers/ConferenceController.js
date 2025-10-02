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

    if (user.role == "candidat") {
      res.status(403).json({
        message: "acces interdit",
      });
    }

    res.status(200).json({
      conf: allconf,
    });
  } catch (error) {
    next(error);
  }
}

async function createConf(req, res, next) {
  try {
    if (req.user.role == "candidat") {
     return res.status(404).json({
        message : "autorisation non permis"
      })
    }
    const code = nanoid.nanoid(4);
      const lien = "https://meet.jit.si/conf-" + uuid();
      const id_user = req.user.id;

      const data = {
        ...req.body,
        lien_conference: lien,
        id_user: id_user,
      };

      const newConf = await createConference(data);
      res.status(200).json({
        message: "conference ajoutée avec succés",
        lien: newConf.lien_conference,
      });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllConf, createConf };
