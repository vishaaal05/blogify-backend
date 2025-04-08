const express = require("express");
const { getAllCategories, createCategory, addPostToCategory, getCategoryById } = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", authMiddleware, createCategory);
router.post("/add/post", authMiddleware, addPostToCategory);

module.exports = router;
