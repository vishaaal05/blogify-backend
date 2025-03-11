const express = require("express");
const { registerUser } = require("../controllers/user.controller");
const {loginUser} = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser); 

module.exports = router;
