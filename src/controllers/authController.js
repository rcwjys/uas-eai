import {z} from 'zod';
import bcrypt from 'bcrypt';
import { ValidationError } from '../utils/error.js';
import { PrismaClient } from '@prisma/client';
import { tryCatch } from '../utils/tryCatch.js';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function register(req, res) {

  const registerSchema = z.object({
    username: z.string().min(3), 
    user_email: z.string().email(), 
    user_password: z.string().min(6), 
    user_attempt: z.number()
  });

  const { username, user_email, user_password, user_attempt} = registerSchema.parse(req.body);

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

  const refreshToken = jwt.sign({username}, process.env.REFRESH_TOKEN_SECRET);

  const user = await prisma.user.create({data: {
    username, 
    user_email,
    user_refresh_token: refreshToken,
    user_password: hashedPassword,
    user_attempt,
  }});

  res.status(201).json({
    user_id: user.user_id,
    username
  });
}

export {register, prisma};