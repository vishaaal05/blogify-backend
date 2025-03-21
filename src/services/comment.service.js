const prisma = require("../config/db");

const createComment = async (content, userId, postId) => {
  return await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
    include: {
      user: true,
    },
  });
};

const getPostComments = async (postId) => {
  return await prisma.comment.findMany({
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

module.exports = {
  createComment,
  getPostComments,
};
