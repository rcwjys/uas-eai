import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { NotFoundError, ValidationError } from '../utils/error.js';

const prisma = new PrismaClient();

const getAllAspiration = async (req, res) => {
    try {
      const aspiration = await prisma.aspiration.findMany();
      res.status(200).json({
        success: true,
        data: aspiration,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch aspiration addresses',
        error: error.message,
      });
    }
};


async function createAspiration(req, res) {
    try {
      console.log('Request body:', req.body);
  
      const aspirationSchema = z.object({
        aspiration: z.string().min(1, { message: 'Aspiration is required' }),
        user_id: z.string().uuid({ message: 'Invalid user ID' }),
        aspiration_address_id: z.string().uuid({ message: 'Invalid aspiration address ID' }),
      });
  
      const { aspiration, user_id, aspiration_address_id } = aspirationSchema.parse(req.body);
  
      
      const user = await prisma.user.findUnique({
        where: { user_id },
      });
  
      if (!user) {
        throw new NotFoundError('User not found');
      }
  
      const aspirationAddress = await prisma.aspiration_Address.findUnique({
        where: { aspiration_address_id },
      });
  
      if (!aspirationAddress) {
        throw new NotFoundError('Aspiration address not found');
      }
  
      const newAspiration = await prisma.aspiration.create({
        data: {
          aspiration,
          user_id,
          aspiration_address_id,
        },
      });
  
      
      res.status(201).json({
        success: true,
        data: newAspiration,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: error.errors || [],
      });
    }
  };




export {
    getAllAspiration,
    createAspiration,
};