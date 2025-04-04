const prisma = require("../config/db");
const calculateReadingTime = require("../utils/readingTime");
const { POST_STATUS, isValidStatus } = require("../constants/postStatus");

const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: { 
      author: true,
      likes: true,
      comments:true,
      favourites:true
      
    }
  });
};

const getAllPostsByAuthorIdService = async (authorId) => {
  return await prisma.post.findMany({
    where: { authorId: authorId }, 
    include: {
      author: true, 
      likes: true,  
    },
  });
};


const createPostService = async (title, content, authorId, status = POST_STATUS.DRAFT, featuredImg = null) => {
  if (!title || !content || !authorId) {
    throw new Error("Missing required fields");
  }

  if (status && !isValidStatus(status)) {
    throw new Error("Invalid post status");
  }

  const readingTime = calculateReadingTime(content);

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

const updatePostService = async (postId, title, content, updatedAt, status, featuredImg) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post Not Found");
  }

  if (status && !isValidStatus(status)) {
    throw new Error("Invalid post status");
  }

  const readingTime = calculateReadingTime(content);

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
      readingTime,
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

// Add a new method to change post status
const updatePostStatus = async (postId, status) => {
  if (!isValidStatus(status)) {
    throw new Error("Invalid post status");
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return await prisma.post.update({
    where: { id: postId },
    data: { status }
  });
};

module.exports = {
  getAllPosts,
  getAllPostsByAuthorIdService,
  createPostService,
  deletePostService,
  updatePostService,
  incrementViews,
  getPostByIdService,
  updatePostStatus,
  POST_STATUS
};
