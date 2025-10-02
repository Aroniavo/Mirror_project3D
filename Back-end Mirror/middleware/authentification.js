const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Récupération du token dans les headers
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "⛔ Token manquant !" });
  }

  // Vérification du token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "⛔ Token invalide ou expiré !" });
    }

    // Stocke les infos du user dans req.user pour les prochains middlewares/controllers
    req.user = user;
    next(); // passe au prochain middleware ou contrôleur
  });
}

module.exports = authenticateToken;
