const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport');

const path = require('path');
const database = require('./database');

// const users = require('./routes/api/users');
const students = require('./routes/api/students');

const app = express();

//DB Config
// const db = require('./config/keys').mongoURI;

database
  .sync()
  .then(() => console.log('Database connected'))
  .catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Password middleware
// app.use(passport.initialize());
// Password Configuration // require('./config/passport')(passport);

// Route
// app.use('/api/users', users);
// app.use('/api/profile', profile);
// app.use('/api/posts', posts);
app.use('/api/students', students);

//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set Static Folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
