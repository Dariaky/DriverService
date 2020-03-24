const express = require('express');
const router = express.Router();

const authorizationService = require('../../service/auth.service');

// const bcrypt = require('bcrypt');


router
  .post('/', (req, res) => {

    // MOCKUP AS FOR NOW
      const user = {
        name : 'DD',   // let username = req.body.username;
        pass: '123'  // let password = req.body.password;
      };
      let usernameFromBD = 'DD';
      let passwordFromBD = '123';


        if (user.name && user.pass) {
        if (user.name === usernameFromBD && user.pass === passwordFromBD) {

          // Creating jwt token
          authorizationService.createToken(user, { expiresIn: '24h'}, (err, jwt_token) => {
            if (err) {
              return res.send(401).json({
                success: false,
                message: 'Impossible to receive a token',
              });
              // console.log('Impossible to receive a token:', err)
            } else {
              // return the JWT token for the future API calls
              return res.json({
                success: true,
                message: 'Authentication successful!',
                token: jwt_token
              });
            }
          } );

        } else {
          return res.send(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
          return res.send(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
  }

  );


module.exports = router;