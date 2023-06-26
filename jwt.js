require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}

function verifyAndParseToken(req) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = verifyToken(token);
      return decoded;
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return null;
    }
  }

module.exports = {
    generateToken,
    verifyToken,
    verifyAndParseToken
  };
