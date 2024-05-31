import {z} from 'zod';
import bcrypt from 'bcrypt';
import { ForbiddenError, ValidationError } from '../utils/error.js';
import { PrismaClient } from '@prisma/client';
import { generateRefreshToken, generateToken } from '../utils/generateToken.js';

const prisma = new PrismaClient();

async function register(req, res) {

  const registerSchema = z.object({
    username: z.string().min(3), 
    user_email: z.string().email(), 
    user_password: z.string().min(6), 
    user_attempt: z.number(),
  });

  const { username, user_email, user_password, user_attempt,} = registerSchema.parse(req.body);

  const hashedPassword = await bcrypt.hash(user_password, 10);

  const isUniqueUsername = await prisma.user.findUnique({
    where: {
      username
    }
  });

  const isUniqueEmail = await prisma.user.findUnique({
    where: {
      user_email
    }
  });

  if (isUniqueUsername !== null) {
    throw new ValidationError("username already exists");
  }

  if (isUniqueEmail !== null) {
    throw new ValidationError("email already exists");
  }


  const user = await prisma.user.create({
    data: {
      username, 
      user_email,
      user_refresh_token: '',
      user_password: hashedPassword,
      user_attempt,
  }});

  return res.status(201).json({
    user_id: user.user_id,
    username
  });
}

async function login(req, res) {

  const loginSchema = z.object({
    username: z.string().min(3), 
    user_password: z.string().min(6), 
  });

  const prisma = new PrismaClient();

  const { username, user_password } = loginSchema.parse(req.body);

  const userLoggedIn = await prisma.user.findUnique({
    where: {
      username
    }
  });

  if (!userLoggedIn) throw new ForbiddenError('username or password wrong');

  const isPasswordValid = await bcrypt.compare(user_password, userLoggedIn.user_password);

  if (!isPasswordValid) throw new ForbiddenError("username or password wrong");

  const token = await generateToken(userLoggedIn.username, userLoggedIn.user_id);

  const refreshToken = await generateRefreshToken({username});

  await prisma.user.update({
    where: {username},
    data: {user_refresh_token: refreshToken}
  });

  res.status(200).json({
    "success": true,
    "accessToken": token
  });
};

async function logout(req, res) {
  const token = req.headers.authorization.split(' ')[1];

}


export {register, prisma, login, logout};