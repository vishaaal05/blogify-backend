const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");
const commentRoutes = require("./routes/comment.routes");
const likeRoutes = require("./routes/like.routes");
const favoriteRoutes = require("./routes/favorite.routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/v1/api/posts", postRoutes);
app.use("/v1/api/users", userRoutes);
app.use("/v1/api/comments", commentRoutes);
app.use("/v1/api/likes", likeRoutes);
app.use("/v1/api/favorites", favoriteRoutes);

module.exports = app;
