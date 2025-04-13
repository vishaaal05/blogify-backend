const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");
const commentRoutes = require("./routes/comment.routes");
const likeRoutes = require("./routes/like.routes");
const favoriteRoutes = require("./routes/favorite.routes");
const categoryRoutes = require("./routes/category.routes");
const uploadRoutes = require("./routes/upload.routes");
const prisma = require("./config/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Added this line

const allowedOrigins = [
  "http://localhost:5173",
  "https://blogify-gules-omega.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: false
}));


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
app.use("/v1/api/categories", categoryRoutes);
app.use("/api/v1/upload", uploadRoutes);  

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;
