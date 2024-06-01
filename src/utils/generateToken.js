import jwt from 'jsonwebtoken';

async function generateToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn: '10s'});
}

async function generateRefreshToken(data) {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30s'});
}

export {generateToken, generateRefreshToken};