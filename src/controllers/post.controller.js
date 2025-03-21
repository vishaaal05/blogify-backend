const postService = require("../services/post.service");

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    // const userId = req.user.id; // This comes from authMiddleware

    if (!title || !content || !authorId) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const post = await postService.createPostService(title, content, authorId);

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required",
      });
    }

    const response = await postService.deletePostService(id);
    return res.status(200).json({
      success: true,
      ...response,
    });
  } catch (error) {
    console.error("Error deleting post:", error.message);

    if (error.message === "Invalid post ID") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Post not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required",
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title or content required",
      });
    }

    const response = await postService.updatePostService(id, title, content);

    return res.status(200).json({
      success: true,
      ...response,
    });
  } catch (error) {
    console.error("Error while updating post", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { getPosts, createPost, deletePost, updatePost };
