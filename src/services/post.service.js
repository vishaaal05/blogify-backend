const prisma = require("../config/db");

const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: { author: true },
  });
};

const createPostService = async (title, content, authorId) => {
  if (!title || !content || !authorId) {
    throw new Error("Missing required fields");
  }

  return await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
    include: {
      author: true, // Include author details in response
    },
  });
};

const deletePostService = async (postId) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) {
    throw new Error("Post not found");
  }

  await prisma.post.delete({
    where: { id: postId },
  });

  return { message: "Post delete successfully" };
};

const updatePostService = async (postId, title, content) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post Not Found");
  }

  await prisma.post.update({
    where: {
      id: postId,
    },
    data: { title, content },
  });
};

module.exports = {
  getAllPosts,
  createPostService,
  deletePostService,
  updatePostService,
};
