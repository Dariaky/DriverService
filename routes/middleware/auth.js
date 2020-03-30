const authorizationService = require('../../service/auth.service');

const verifyToken = async (req, res, next) => {

  try {
    const jwtToken = req.headers['authorization'];

    console.log("HEADERS", req.headers);
    const tokenVerified = await authorizationService.verifyToken(jwtToken);
    console.log("TOKEN", tokenVerified);
    req.token = tokenVerified; // writing token into request object
    next();
  } catch(err) {
    res.status(500).json({status: err.message});
  }
};

module.exports = verifyToken;
