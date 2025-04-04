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
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const userId = req.user.id;
    const favorites = await favoriteService.getUserFavorites(userId);
    
    if (!favorites) {
      return res.status(404).json({
        success: false,
        message: "No favorites found"
      });
    }

    res.json({
      success: true,
      favorites
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};

module.exports = {
  toggleFavorite,
  getUserFavorites
};
