const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const students = require("./routes/api/students");

const app = express();

//DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Password middleware
app.use(passport.initialize());

// Password Configuration
require("./config/passport")(passport);

// Route
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/students", students);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
