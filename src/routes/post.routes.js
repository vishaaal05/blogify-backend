const express = require("express");
const { getPosts, createPost, deletePost, updatePost } = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", getPosts);
router.post("/create",authMiddleware, createPost);
router.delete("/:id",authMiddleware, deletePost);
router.put("/:id", authMiddleware, updatePost)

module.exports = router;
