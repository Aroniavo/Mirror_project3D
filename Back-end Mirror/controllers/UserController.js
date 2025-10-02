const { createUser,loginUser } = require("../services/UserService");
const  jwt = require("jsonwebtoken");

async function registerUser(req, res, next) {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);

    const token = jwt.sign(
      { id: newUser.id_user, email: newUser.email_user },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );
    res
      .status(201)
      .json({ message: "Utilisateur créé avec succès", token: token });
  } catch (error) {
    next(error);
  }
}

async function loginController(req, res, next) {
  try {
    const loginData = req.body;
    const user = await loginUser(loginData);

    const token = jwt.sign(
      { id: user.id_user, email: user.email_user },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );
    res.status(200).json({ message: "Connexion réussie", token: token });
  } catch (error) {
    next(error);
  }
}

module.exports = { registerUser, loginController };
