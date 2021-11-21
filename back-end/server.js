const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// setup express
const app = express(); 
 
// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/survey', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// import the users module and setup its API path
// const users = require("./users.js");
// app.use("/api/users", users.routes);
// const photos = require("./photos.js");
// app.use("/api/photos", photos.routes);
const survey = require("./survey.js");
app.use("/api/survey", survey.routes);
// const comments = require("./comments.js");
// app.use("/api/comments", comments.routes);


app.listen(3004, () => console.log('Server listening on port 3004!'));

