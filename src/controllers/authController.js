import {z} from 'zod';
import bcrypt from 'bcrypt';
import { ValidationError } from '../utils/error.js';

async function register(req, res) {

  const registerSchema = z.object({
    username: z.string().min(3), 
    user_email: z.string().email(), 
    user_password: z.string().min(6), 
    user_attempt: z.number(), 
    is_admin: z.boolean(), 
  });

  

  const { username, user_email, user_password, user_attempt, is_admin } = registerSchema.parse(req.body);

  const hashedPassword = await bcrypt.hash(user_password, 10);


}


export {register};