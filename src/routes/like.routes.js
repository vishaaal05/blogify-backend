const express = require("express");
const { getPostLikes, createLike } = require("../controllers/like.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/toggle", authMiddleware, createLike);
router.get("/post/:postId", authMiddleware, getPostLikes);

module.exports = router;           