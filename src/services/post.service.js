const prisma = require("../config/db");

const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: { author: true },
  });
};

const createPostService = async (title, content, authorId, status = 'draft', featuredImg = null, readingTime = null) => {
  if (!title || !content || !authorId) {
    throw new Error("Missing required fields");
  }

  return await prisma.post.create({
    data: {
      title,
      content,
      authorId,
      status,
      featuredImg,
      readingTime,
    },
    include: {
      author: true,
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

const updatePostService = async (postId, title, content, updatedAt, status, featuredImg, readingTime) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post Not Found");
  }

  return await prisma.post.update({
    where: {
      id: postId,
    },
    data: { 
      title, 
      content, 
      updatedAt,
      status: status || post.status,
      featuredImg: featuredImg || post.featuredImg,
      readingTime: readingTime || post.readingTime,
    },
  });
};

const incrementViews = async (postId) => {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      views: {
        increment: 1,
      },
    },
  });
};

const getPostByIdService = async (postId) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      comments: true,
      likes: true,
      categories: {
        include: {
          category: true
        }
      },
      tags: {
        include: {
          tag: true
        }
      }
    }
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

module.exports = {
  getAllPosts,
  createPostService,
  deletePostService,
  updatePostService,
  incrementViews,
  getPostByIdService
};
