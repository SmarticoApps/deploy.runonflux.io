// const http = require('http');
// const server = http.createServer((req, res) => {
//   res.end("hello world!");
// });
// server.listen(80);

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express();

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

var corsOptions = {
  origin: 'http://localhost:3000'
}
// use cors options
app.use(cors(corsOptions))

// 
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// routes
const blog = require('./app/routes/blog')
app.use('/api/blog', blog)

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});