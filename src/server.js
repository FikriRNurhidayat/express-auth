// To load environment variable
const env = process.env.NODE_ENV;
const http = require('http');
if (!env || env == 'development') {
 const dotenv = require('dotenv');
 dotenv.config();
};

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')

const responseFormatter = require('./helpers/responseFormatter.js');

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');

console.log(process.env.DB_CONNECTION);
// Connect to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, (err) => {
  if (err) return console.log(err);
  console.log('Database Connected!');
});

app.use('/kitab', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// Root path
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));
app.all('/', (req, res) => {
  res.render('index')
})

// Using body-parser
const bodyParser = require('body-parser'); // Import body-parser library
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // To parse JSON request

// Adding route-level middleware
const router = require('./routes');
app.use('/api', router); // Using route middleware on express application.

app.get('/test', (req, res) => {
    res.render('whoAmI', {
      name: "Fikri Rahmat Nurhidayat",
      age: 20
    })
})

app.listen(port, () => {
  console.log(`Server started at ${Date()}`);
  console.log(`Listening on port ${port}!`);
});
