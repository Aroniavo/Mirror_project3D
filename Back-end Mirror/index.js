require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const sequelize = require("./middleware/dbConnection"); // ← tu importes juste
const userRoutes = require("./routes/UserRoute");
const errorHandler = require("./middleware/errorHandler");

// middlewares
app.use(express.json());
app.use(errorHandler);

// routes
app.get("/", (req, res) => res.send("Hello World!"));

app.use("/users", userRoutes);

// Démarrage du serveur
app.listen(port, () => console.log(`🚀 Serveur lancé sur le port ${port}`));

// Test connexion DB
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connecté à PostgreSQL !");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ Modèles synchronisés !");
  })
  .catch((error) => {
    console.error("❌ Erreur de connexion :", error);
  });
