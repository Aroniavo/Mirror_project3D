const DataTypes = require("sequelize")
const sequelize = require("../middleware/dbConnection");

const UserCandidat = sequelize.define("UserCandidat",{
    id_userCandidat : {
        type : DataTypes.STRING,
        allowNull : false
    },
    name_UserCandidat : {
        type:DataTypes.STRING,
        allowNull : false
    },
    firs_name_UserCandidat : {
        type:DataTypes.STRING,
        allowNull : true
    },
    pswd_UserCandidat : {
        type : DataTypes.STRING,
        allowNull:false
    },
    email_UserCandidat : {
        type : DataTypes.STRING,
        allowNull:false,
        unique : true
    }
})

module.exports = UserCandidat