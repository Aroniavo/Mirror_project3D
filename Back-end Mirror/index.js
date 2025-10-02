require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

const sequelize = require("./middleware/dbConnection");
const userRoutes = require("./routes/UserRoute");
const conferenceRoutes = require("./routes/ConferenceRoute")
const entretienRoutes=require("./routes/EntretienRoute")
const errorHandler = require("./middleware/errorHandler");
const { User, Conference } = require("./models/RelationDB");


// middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// routes
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/api/health", (req, res) => res.json({ message: "Backend Mirror3D fonctionne !" }));

app.use("/api/auth", userRoutes);

// Conference routes
app.use("/api/conference", conferenceRoutes)
app.use("/api/entretien",entretienRoutes)
// Error handler middleware (doit être après les routes)
app.use(errorHandler);

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
