const prisma = require("../config/db");

const getAllCategories = async () => {
  return await prisma.category.findMany({
    include: {
      posts: {
        include: {
          post: true
        }
      }
    }
  });
};

const createCategory = async (name) => {
  return await prisma.category.create({
    data: { name }
  });
};

const addPostToCategory = async (postId, categoryId) => {
  return await prisma.postCategory.create({
    data: {
      postId,
      categoryId
    },
    include: {
      category: true,
      post: true
    }
  });
};

const removePostFromCategory = async (postId, categoryId) => {
  return await prisma.postCategory.delete({
    where: {
      postId_categoryId: {
        postId,
        categoryId
      }
    }
  });
};

const getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: { id },
    include: {
      posts: {
        include: {
          post: {
            include: {
              author: true
            }
          }
        }
      }
    }
  });
};

module.exports = {
  getAllCategories,
  createCategory,
  addPostToCategory,
  removePostFromCategory,
  getCategoryById
};
