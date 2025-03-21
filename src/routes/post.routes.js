const express = require("express");
const { getPosts, createPost, deletePost, updatePost, getPostById } = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", getPosts);
router.post("/create",authMiddleware, createPost);
router.delete("/:id",authMiddleware, deletePost);
router.put("/:id", authMiddleware, updatePost)
router.get("/:id", getPostById);

module.exports = router;
