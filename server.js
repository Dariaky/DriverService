const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');

const Shipper = require('./models/Shipper.model');
const Driver = require('./models/Driver.model');
const authorized = require('./routes/middleware/auth');

app = express();
const PORT = config.get('port') || 8081;
// const port = process.env.port || 8081;


mongoose.connect(config.get('mongoUri'));
const db = mongoose.connection;

// Check connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.log(err);
});

// PARSERS:
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.urlencoded()) - parsing URL-encoded bodies
app.use(bodyParser.json( {extended: true }));
// the same as express.json() - parsing JSON bodies sent by API clients


// Routes
app.get('/', (req, res) => {
  return res.send('Hello');
});

app.use('/registration', require('./routes/api/registration'));
app.use('/login', require('./routes/api/login'));

app.use(authorized);

app.use('/profile', require('./routes/api/profile'));

// Find all users:
app.get('/drivers', (req, res) => {
  Driver.find({})
      .exec((err, users) => {
        if (err) {
          res.send('Error with users has occurred');
        } else {
          res.json(users);
        }
      });
});

app.get('/shippers', (req, res) => {
  Shipper.find({})
      .exec((err, users) => {
        if (err) {
          res.send('Error with users has occured');
        } else {
          res.json(users);
        }
      });
});

// app.use('/api/note', noteRouter);
// app.use('/api/profile', profileRouter);

// Find a single user:
// app.get('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findOne({_id: req.params.id});
//     res.json({user});
//   } catch (err) {
//     res.send('Error with user has occured');
//   }
// });

// Create new user:
// app.post('/users', async (req, res) => {
//   const newUser = await new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     role: req.body.role,
//   });
//
//   newUser.save()
//       .then((user) => {
//         res.status(200).json({user});
//       })
//       .catch((err) => {
//         res.status(500).json({status: err.message});
//       });
// });

// Update our user properties:
// app.put('/users/:id', async (req, res) => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//         {_id: req.params.id},
//         {password: req.body.password},
//         {new: true}
//     );
//     res.json({updatedUser});
//   } catch (err) {
//     res.send('Error with user has occured');
//   }
// });

// Remover user
// app.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findOneAndRemove({
//       _id: req.params.id,
//     });
//     res.json({user});
//   } catch (err) {
//     res.status(401).json({status: err.message});
//   }
// });

app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Start Server
app.listen(PORT, (error) => {
  if (error) {
    console.log('Cannot start servers:', error);
  }
  console.log(`Server is listening on port ${PORT}...`);
});


// prettier - formatting code according to set parameters
// eslint - more oriented on errors in code
