const prisma = require("../config/db");

const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: { author: true },
  });
};

const createPost = async (title, content, authorId) => {
  return await prisma.post.create({
    data: { title, content, authorId },
  });
};

module.exports = { getAllPosts, createPost };
