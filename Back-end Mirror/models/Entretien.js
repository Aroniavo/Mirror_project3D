const { DataTypes } = require("sequelize");
const sequelize = require("../middleware/dbConnection");
const User = require("../models/User");

const Entretien = sequelize.define("Entretien", {
  id_entretien: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_entretien: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  lien_entretien: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code_acces: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id_user",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

module.exports = Entretien;
