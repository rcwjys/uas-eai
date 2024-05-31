import { ForbiddenError } from "../src/utils/error.js";
import jwt from 'jsonwebtoken';

export async function authenticate(req, res, next) {

  const authorizationHeader = req.headers.authorization;
  
  if (!authorizationHeader) throw new ForbiddenError('not authorize');

  const tokenBearer = authorizationHeader.split(' ');

  if (tokenBearer[0] !== 'Bearer') throw new ForbiddenError('not authorize, invalid header format');

  const token = tokenBearer[1];

  if (!token) throw new ForbiddenError('not authorize')

  jwt.verify(token, process.env.TOKEN_SECRET, (err, userData) => {
    if (err) throw new ForbiddenError('token is no longer valid');
    
    req.userData = userData
    next()
  });

}
