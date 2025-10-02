const { createUser, loginUser, getUserById, mapUserToResponse } = require("../services/UserService");
const jwt = require("jsonwebtoken");

async function registerUser(req, res, next) {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);

    const user = mapUserToResponse(newUser);
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: "7d" }
    );
    
    res.status(201).json({ 
      message: "Inscription réussie", 
      token: token,
      user: user
    });
  } catch (error) {
    next(error);
  }
}

async function loginController(req, res, next) {
  try {
    const loginData = req.body;
    const userFromDb = await loginUser(loginData);

    const user = mapUserToResponse(userFromDb);
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: "7d" }
    );
    
    res.status(200).json({ 
      message: "Connexion réussie", 
      token: token,
      user: user
    });
  } catch (error) {
    next(error);
  }
}

async function getUserProfile(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }
    
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    const userFromDb = await getUserById(payload.id);
    
    if (!userFromDb) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    
    const user = mapUserToResponse(userFromDb);
    res.json({ user: user });
  } catch (error) {
    next(error);
  }
}

module.exports = { registerUser, loginController, getUserProfile };
