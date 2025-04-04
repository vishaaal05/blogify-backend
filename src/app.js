const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");
const commentRoutes = require("./routes/comment.routes");
const likeRoutes = require("./routes/like.routes");
const favoriteRoutes = require("./routes/favorite.routes");
const prisma = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

// Ensure database is connected before starting the server
app.use(async (req, res, next) => {
  try {
    await prisma.$connect();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database connection error' 
    });
  }
});

app.use("/v1/api/posts", postRoutes);
app.use("/v1/api/users", userRoutes);
app.use("/v1/api/comments", commentRoutes);
app.use("/v1/api/likes", likeRoutes);
app.use("/v1/api/favorites", favoriteRoutes);

module.exports = app;
