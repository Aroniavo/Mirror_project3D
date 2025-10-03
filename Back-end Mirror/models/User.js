const DataTypes  = require("sequelize");
const sequelize = require("../middleware/dbConnection");

const User = sequelize.define("User", {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
 
});

module.exports = User;
