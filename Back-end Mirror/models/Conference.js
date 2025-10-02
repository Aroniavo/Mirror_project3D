const { DataTypes } = require("sequelize");
const sequelize = require("../middleware/dbConnection");
const User = require("../models/User")

const Conference = sequelize.define("Conference", {
  id_conference: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_company : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_conference: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:DataTypes.NOW
  },
  lien_conference : {
    type : DataTypes.STRING,
    allowNull:false,
  },
  code_conference : {
    type : DataTypes.STRING,
    allowNull:false,
  },
  id_user : {
    type : DataTypes.INTEGER,
    allowNull : false,
    references : {
        model : User,
        key :"id_user"
    },
    onDelete : "CASCADE",
    onUpdate : "CASCADE"
  }

});

module.exports = Conference;