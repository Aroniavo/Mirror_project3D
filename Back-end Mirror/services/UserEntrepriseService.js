const entreprise = require("../models/UserEntreprise");
const createError = require("../utils/CreateError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const standSalon = require("../models/StandSalon")
const { nanoid } = require("nanoid");
const {v4:uuid} = require("uuid")

// creation de compte
async function createUserEntrepriseService(data) {
  const user = await entreprise.findOne({
    where: { email_UserEntreprise: data.email_UserEntreprise },
  });

  if (user) {
    throw createError("Email deja utilisé", 409);
  }

  const mdpHash = await bcrypt.hash(data.pswd_UserEntreprise, process.env.SALT);

  const newEntr = await entreprise.create({
    ...data,
    id_UserEntreprise: nanoid(6),
    pswd_UserEntreprise: mdpHash,
  });

  const token = jwt.sign(
    {
      id: newEntr.id_UserEntreprise,
      email: newEntr.email_UserEntreprise,
      first_name: newEntr.frist_name_UserEntreprise,
      name: newEntr.name_UserEntreprise,
      company : newEntr.name_company
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );

  return token;
}

// authentification
async function authUserEntrepriseService(data) {
  const email = data.email || data.email_UserEntreprise;
  const pswd = data.pswd || data.pswd_UserEntreprise;

  const user = await entreprise.findOne({
    where: { email_UserEntreprise: email },
  });

  if (!user) {
    throw createError("Email inexistante ou invalide", 403);
  }

  const isPswdMatch = await bcrypt.compare(pswd, user.pswd_UserEntreprise);

  if (!isPswdMatch) {
    throw createError("Infomation non valide", 403);
  }

  const token = jwt.sign(
    {
      id: user.id_UserEntreprise,
      email: user.email_UserEntreprise,
      first_name: user.frist_name_UserEntreprise,
      name: user.name_UserEntreprise,
      company : newEntr.name_company
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );

  return token;
}

// creation d'une stand
async function createStandService(stand) {
    const standIsExist = await standSalon.findOne({where : {
        name_UserEntreprise : stand.name_UserEntreprise
    }})

    if(standIsExist){
        throw createError("Un stand au nom de votre entreprise existe déja",409)
    }
    
const lien = "https://meet.jit.si/conf-" + uuid();
    const stand = await standSalon.create({
        ...stand,
        lien_standSalon : lien,
        id_standSalon : nanoid(6)
    })

    return stand;
}

// creation entretien
// joindre autre salon

module.exports = {createStandService, createUserEntrepriseService, authUserEntrepriseService };
