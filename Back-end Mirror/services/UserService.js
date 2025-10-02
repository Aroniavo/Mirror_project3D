const { where } = require("sequelize");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Fonction utilitaire pour mapper les données utilisateur vers le frontend
function mapUserToResponse(user) {
  if (!user) return null;
  return {
    id: user.id_user,
    name: user.name_user,
    email: user.email_user,
    role: user.role_user
  };
}

async function createUser(data) {
  // Mapper les attributs du frontend vers le backend
  const mappedData = {
    name_user: data.name || data.name_user,
    email_user: data.email || data.email_user,
    password_user: data.password || data.password_user,
    role_user: data.role || data.role_user || "candidat"
  };

  const userExist = await User.findOne({
    where: { email_user: mappedData.email_user },
  });
  if (userExist) {
    const error = new Error("Email déjà utilisé");
    error.statusCode = 409;
    throw error;
  }
  
  // Hacher le mot de passe
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(mappedData.password_user, saltRounds);
  
  const newUser = await User.create({
    name_user: mappedData.name_user,
    email_user: mappedData.email_user,
    password_user: hashedPassword,
    role_user: mappedData.role_user
  });
  return newUser;
}

async function loginUser(data) {
  // Mapper les attributs du frontend vers le backend
  const email = data.email || data.email_user;
  const password = data.password || data.password_user;

  const user = await User.findOne({
    where: { email_user: email },
  });
  
  if (!user) {
    const error = new Error("Identifiants invalides");
    error.statusCode = 401;
    throw error;
  }
  
  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password_user);
  if (!isPasswordValid) {
    const error = new Error("Identifiants invalides");
    error.statusCode = 401;
    throw error;
  }
  
  return user;
}

async function getUserById(id) {
  const user = await User.findOne({
    where: { id_user: id },
  });
  return user;
}

module.exports = { createUser, loginUser, getUserById, mapUserToResponse };
