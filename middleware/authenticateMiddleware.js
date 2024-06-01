import { ForbiddenError, NotAuthorizeError } from "../src/utils/error.js";
import jwt from 'jsonwebtoken';

export async function authenticate(req, res, next) {

  const authorizationHeader = req.headers.authorization;
  
  if (!authorizationHeader) throw new NotAuthorizeError('not authorize');

  const tokenBearer = authorizationHeader.split(' ');

  if (tokenBearer[0] !== 'Bearer') throw new NotAuthorizeError('not authorize, invalid header format');

  const token = tokenBearer[1];

  if (!token) throw new NotAuthorizeError('not authorize')

  jwt.verify(token, process.env.TOKEN_SECRET, (err, userData) => {
    
    if (err) throw new ForbiddenError("token is not longer valid");

    req.userData = userData;
    next()
  });
}
