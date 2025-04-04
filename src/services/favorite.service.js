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
    // Ensure connection is established
    await prisma.$connect();
    
    return await prisma.favorite.findMany({
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
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch favorites. Please try again later.');
  }
};

module.exports = {
  toggleFavorite,
  getUserFavorites,
};
