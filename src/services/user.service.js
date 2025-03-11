const prisma = require("../config/db");

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

const createUser = async (name, email, hashedPassword) => {
  return await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
};

module.exports = { getUserByEmail, createUser };
