const prisma = require("../config/db");

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const executeWithRetry = async (operation) => {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === MAX_RETRIES - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      await prisma.$connect();
    }
  }
};

const toggleFavorite = async (userId, postId) => {
  return executeWithRetry(async () => {
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingFavorite) {
      // If favorite exists, remove it
      await prisma.favorite.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return { message: "Post removed from favorites" };
    }

    // If favorite doesn't exist, create it
    await prisma.favorite.create({
      data: {
        userId,
        postId,
      },
    });
    return { message: "Post added to favorites" };
  });
};

const getUserFavorites = async (userId) => {
  return executeWithRetry(async () => {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        post: {
          include: {
            author: true,
            likes: true,
            comments: true,
          },
        },
      },
    });
    return favorites;
  });
};

module.exports = {
  toggleFavorite,
  getUserFavorites,
};
