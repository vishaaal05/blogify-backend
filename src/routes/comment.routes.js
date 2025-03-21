const express = require("express");
const { createComment, getPostComments } = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", authMiddleware, createComment);
router.get("/post/:postId", getPostComments);

module.exports = router;
