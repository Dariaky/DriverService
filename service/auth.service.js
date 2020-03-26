const jwt = require('jsonwebtoken');
const privateKey = require('../config/auth').secret;


class AuthorizationService {
  async createToken(user, settings) {
    return await jwt.sign(JSON.stringify(user), privateKey, settings);
  }

  async verifyToken(token) {
    return await jwt.verify(token, privateKey);
  }
}

module.exports = new AuthorizationService();
