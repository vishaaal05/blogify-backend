const likeService = require("../services/like.service");

const createLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    if (!postId) {
      return res.status(400).json({ message: "postId required" });
    }

    const existingLike = await likeService.checkLikeExistsService(userId, postId);
    
    if (existingLike) {
      await likeService.deleteLikeService(userId, postId);
      return res.status(200).json({
        success: true,
        message: "Post unliked successfully",
      });
    }

    const like = await likeService.createLikeService(userId, postId);
    res.status(201).json({
      success: true,
      like,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const likes = await likeService.getPostLikesService(postId);
    res.json({
      success: true,
      likes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLike,
  getPostLikes,
};
