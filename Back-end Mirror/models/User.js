const DataTypes  = require("sequelize");
const sequelize = require("../middleware/dbConnection");

const User = sequelize.define("User", {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_user : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_user: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "candidat",
  },
});

module.exports = User;
