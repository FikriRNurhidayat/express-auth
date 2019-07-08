// To load environment variable
const env = process.env.NODE_ENV;

if (!env || env == 'development') {
 const dotenv = require('dotenv');
 dotenv.config();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');

// Connect to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, (err) => {
  if (err) return console.log(err);
  console.log('Database Connected!');
});

// Using body-parser
const bodyParser = require('body-parser'); // Import body-parser library
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // To parse JSON request

// Adding route-level middleware
const router = require('./routes');
app.use('/api', router); // Using route middleware on express application.

app.listen(port, () => {
  console.log(`Server started at ${Date()}`);
  console.log(`Listening on port ${port}!`);
});
