const express = require("express");
const { getPosts, createPost, deletePost } = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", getPosts);
router.post("/create",authMiddleware, createPost);
router.delete("/:id",authMiddleware, deletePost);

module.exports = router;
