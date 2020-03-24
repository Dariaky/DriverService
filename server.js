const express = require('express');
const bodyParser = require('body-parser');

app = express();
const port = process.env.port || 8081;


// PARSERS:
app.use(bodyParser.urlencoded({extended: true})); // Parsing data from our forms
// app.use(bodyParser.json());  || the same as express.json() ?
app.use(express.urlencoded()); // Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json()); // Parse JSON bodies (as sent by API clients)

// Import Routes
const login = require('./routes/api/login');


// Routes
app.get('/', (req, res) => {
  return res.send('Hello')
});

app.use('/login', login);

app.use("*", (req, res) => {
  res.status(404).send('Page not found');
});


// Start Server
app.listen(port, (error) => {
  if (error) {
    console.log('Cannot start servers:', error);
  }
  console.log(`Server is listening on port ${port}...`)
});