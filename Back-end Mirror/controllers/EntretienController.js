const {
  getAllEntretienService,
  createEntretienService
} = require("../services/EntretienService");
const nanoid = require("nanoid");
const { v4: uuid } = require("uuid");


async function getAllEntretien(req, res, next) {
  try {
    const user = req.user;

    if (user.role === "candidat") {
      return res.status(403).json({
        message: "Accès interdit",
      });
    }

    const entretiens = await getAllEntretienService();
    res.status(200).json({
      conferences: entretiens,
    });
  } catch (error) {
    next(error);
  }
}

async function createEntrt(req, res, next) {
  try {
    if (req.user.role === "candidat") {
     return res.status(403).json({
        message: "Autorisation non accordée"
      })
    }
    
    // Générer un lien unique pour la conférence
    const lien = "https://meet.jit.si/ent-" + uuid();
    const id_user = req.user.id;
    const code = nanoid.nanoid(6)

    const data = {
      ...req.body,
      lien_elien_entretiennt: lien,
      id_user: id_user,
    };

    const newEnt = await createEntretienService(data);
    res.status(201).json({
      message: "Conférence créée avec succès",
      conference: {
        id_conference: newEnt.id_entretien,
        name_company: newEnt.name_company,
        date_entretien: newEnt.date_entretien,
        lien_entretien: newEnt.lien_entretien
      }
    });
  } catch (error) {
    next(error);
  }}

  module.exports = {createEntrt,getAllEntretien}