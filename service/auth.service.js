const jwt = require('jsonwebtoken');
const { privateKey } = require('../config/auth');


class AuthorizationService {

  createToken(user, settings, callback) {
    return jwt.sign(JSON.stringify(user), privateKey, settings, callback);
  }

  verifyToken(token, callback) {
    return jwt.verify(token, privateKey, callback);
  }
}

module.exports = new AuthorizationService();
