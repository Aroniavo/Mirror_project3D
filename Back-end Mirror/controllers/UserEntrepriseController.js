const {
  createUserEntrepriseService,
  createStandService,
  authUserEntrepriseService,
} = require("../services/UserEntrepriseService");
const result = require("../utils/Result");

// creation compte
async function createUserEntreprise(req, res, next) {
  try {
    const token = await createUserEntrepriseService(req.body);
    return result.created(res, {
      message: "Utilisateur crée",
      token: token,
    });
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    }
    next(error);
  }
}

// connexion
async function authUserEntreprise(req, res, next) {
  try {
    const token = await authUserEntrepriseService(req.body);
    return result.Ok(res, {
      message: "Utilisateur connecté",
      token: token,
    });
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    }
    next(error);
  }
}

// creation stand


module.exports = {authUserEntreprise,createUserEntreprise}