const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5432,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connecté à PostgreSQL !");
  } catch (error) {
    console.error("❌ Erreur de connexion :", error);
  }
}

testConnection();

module.exports = sequelize;
