const express = require("express");
const { toggleFavorite, getUserFavorites } = require("../controllers/favorite.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/toggle", authMiddleware, toggleFavorite);
router.get("/", authMiddleware, getUserFavorites);

module.exports = router;
