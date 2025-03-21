const prisma = require("../config/db");

const createLikeService = async (userId, postId) => {
  return await prisma.like.create({
    data: {
      userId,
      postId,
    },
    include: {
      user: true,
    },
  });
};

const getPostLikesService = async (postId) => {
  return await prisma.like.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const checkLikeExistsService = async (userId, postId) => {
  return await prisma.like.findFirst({
    where: {
      userId,
      postId,
    },
  });
};

const deleteLikeService = async (userId, postId) => {
  return await prisma.like.delete({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
};

module.exports = {
  createLikeService,
  getPostLikesService,
  checkLikeExistsService,
  deleteLikeService,
};
