const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/post.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("v1/api/posts", postRoutes);

module.exports = app;
