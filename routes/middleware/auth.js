// const authorizationService = require('../../service/auth.service');
//
// const verifyToken = (req, res, next) => {
//
//     // 1. GET TOKEN FROM REQ
//
//
//   if (jwt_token) {
//     authorizationService.verifyToken(jwt_token, secret, (err, token) => {
//       if (err) {
//         return res.json({
//           success: false,
//           message: 'Token is not valid'
//         });
//       } else {
//         req.token = jwt_token; // writing token into request object
//         next();
//       }
//     });
//
//   } else {
//     return res.json({
//       success: false,
//       message: 'Auth token is not supplied'
//     });
//   }
// };
//
// module.exports = verifyToken;