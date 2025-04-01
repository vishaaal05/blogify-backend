const favoriteService = require("../services/favorite.service");

const toggleFavorite = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id; // From auth middleware

    if (!postId) {
      return res.status(400).json({ 
        success: false,
        message: "Post ID is required" 
      });
    }

    const result = await favoriteService.toggleFavorite(userId, postId);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const favorites = await favoriteService.getUserFavorites(userId);
    
    res.json({
      success: true,
      favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  toggleFavorite,
  getUserFavorites
};
