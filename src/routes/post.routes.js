const express = require("express");
const { getPosts, createPost } = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", getPosts);
router.post("/create",authMiddleware, createPost);

module.exports = router;
