const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");
const commentRoutes = require("./routes/comment.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/v1/api/posts", postRoutes);
app.use("/v1/api/users", userRoutes);
app.use("/v1/api/comments", commentRoutes);

module.exports = app;
