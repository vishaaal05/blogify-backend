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
            return res.status(400).json({ message: "Title and content are required" });
        }

        const post = await postService.createPost(title, content, authorId);

        res.status(201).json({ 
            success: true,
            post 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

module.exports = { getPosts, createPost };
