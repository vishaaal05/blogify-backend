const prisma = require("../config/db");

const toggleFavorite = async (userId, postId) => {
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
};

const getUserFavorites = async (userId) => {
  try {
    // Try to reconnect if disconnected
    if (!prisma.$connect) {
      await prisma.$connect();
    }
    
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
  } catch (error) {
    console.error('Database error:', error);
    if (error.code === 'P2021') {
      throw new Error('Database table not found. Please check migrations.');
    }
    if (error.code === 'P2002') {
      throw new Error('Database connection failed.');
    }
    throw error;
  }
};

module.exports = {
  toggleFavorite,
  getUserFavorites,
};
