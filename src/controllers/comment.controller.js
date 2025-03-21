const commentService = require("../services/comment.service");

const createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const userId = req.user.id; // From auth middleware

    if (!content || !postId) {
      return res.status(400).json({ message: "Content and postId are required" });
    }

    const comment = await commentService.createComment(content, userId, postId);
    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await commentService.getPostComments(postId);
    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  getPostComments,
};
