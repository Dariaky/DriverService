const authorizationService = require('../../service/auth.service');

const verifyToken = (req, res, next) => {
  // 1. GET TOKEN FROM REQ
  const jwtToken = req.body.token;

  if (jwtToken) {
    authorizationService.verifyToken(jwtToken);

    req.token = jwtToken; // writing token into request object
    next();
  } else {
    return res.json({
      success: false,
      message: 'Authorization token is not supplied',
    });
  }
};

module.exports = verifyToken;
