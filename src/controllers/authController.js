import {z} from 'zod';
import bcrypt from 'bcrypt';
import { ValidationError } from '../utils/error.js';
import {PrismaClient} from '@prisma/client'
import { tryCatch } from '../utils/tryCatch.js';

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

  tryCatch(await prisma.user.create({data: {
    username, 
    user_email,
    user_refresh_token: 'halo',
    user_password: hashedPassword,
    user_attempt,
  }}))
  


  // main()
  // .catch(err => {
  //   throw new Error(err)
  // })
  // .finally(async () => {
  //   await prisma.$disconnect();
  // })
}


export {register, prisma};