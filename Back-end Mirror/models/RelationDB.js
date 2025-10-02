const User = require("./User");
const Conference = require("./Conference");
const Entretien = require ("./Entretien")

User.hasMany(Conference, { foreignKey: "id_user" });
Conference.belongsTo(User, { foreignKey: "id_user" });

User.hasMany(Entretien,{foreignKey:"id_user"});
Entretien.belongsTo(User,{foreignKey:"id_user"})

module.exports = { User, Conference };