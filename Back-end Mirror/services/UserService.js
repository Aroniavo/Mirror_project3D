const { where } = require("sequelize");
const User = require("../models/User");

async function createUser(data) {
  const userExist = await User.findOne({
    where: { email_user: data.email_user },
  });
  if (userExist) {
    throw new Error("Email already in use");
  } else {
    const newUser = await User.create(data);
    return newUser;
  }
}

async function loginUser(data) {
  const user = await User.findOne({
    where: { email_user: data.email_user, password_user: data.password_user },
  });
  if (!user) {
    throw new Error("Invalid email or password");
  } else {
    return user;
  }
}

module.exports = { createUser, loginUser };
