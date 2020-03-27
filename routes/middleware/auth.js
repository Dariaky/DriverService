const authorizationService = require('../../service/auth.service');

const verifyToken = (req, res, next) => {
  // 1. GET TOKEN FROM REQ
  const jwtToken = req.body.token;
  // const userId = req.body.id;

  if (jwtToken) {
    authorizationService.verifyToken(jwtToken);

    req.token = jwtToken; // writing token into request object
    // req.userId = userId; // writing id into request
    next();
  } else {
    return res.json({
      success: false,
      message: 'Authorization token is not supplied',
    });
  }
};

module.exports = verifyToken;
