const User = require("./User");
const Conference = require("./Conference");

User.hasMany(Conference, { foreignKey: "id_user" });

Conference.belongsTo(User, { foreignKey: "id_user" });

module.exports = { User, Conference };