const { DataTypes } = require("sequelize");
const sequelize = require("../middleware/dbConnection");

const standSalon = sequelize.define("Stand_salon", {
  id_standSalon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name_UserEntreprise: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lien_standSalon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_UserEntreprise: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status_validation: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "En attente",
  },
});

module.exports = standSalon;
