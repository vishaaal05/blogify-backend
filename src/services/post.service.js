const prisma = require("../config/db");

const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: { author: true },
  });
};

const createPost = async (title, content, authorId) => {
    if (!title || !content || !authorId) {
      throw new Error('Missing required fields');
    }
    
    return await prisma.post.create({
      data: { 
        title, 
        content, 
        authorId 
      },
      include: {
        author: true // Include author details in response
      }
    });
  };

module.exports = { getAllPosts, createPost };
