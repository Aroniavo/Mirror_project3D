const DataTypes = require("sequelize")
const sequelize = require("../middleware/dbConnection");

const UserEntreprise = sequelize.define("UserCandidat",{
    id_UserEntreprise : {
        type : DataTypes.STRING,
        allowNull : false
    },
    name_UserEntreprise : {
        type:DataTypes.STRING,
        allowNull : false
    },
    frist_name_UserEntreprise : {
        type:DataTypes.STRING,
        allowNull : true
    },
    pswd_UserEntreprise : {
        type : DataTypes.STRING,
        allowNull:false
    },
    name_company : {
        type : DataTypes.STRING,
        allowNull:false
    },
    email_UserEntreprise : {
        type:DataTypes.STRING,
        allowNull : false,
        unique : true
    }
})

module.exports = UserEntreprise