import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { NotFoundError } from '../utils/error.js';

const prisma = new PrismaClient();

const getAllAspirationAddresses = async (req, res) => {
  try {
    const aspirationAddresses = await prisma.aspiration_Address.findMany();
    res.status(200).json({
      success: true,
      data: aspirationAddresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch aspiration addresses',
      error: error.message,
    });
  }
};

async function getAspirationAddressById(req, res) {
  try {
    console.log("ID parameter:", req.params.id);

    const aspirationAddress = await prisma.aspiration_Address.findUnique({
      where: { aspiration_address_id: req.params.id },
    });

    if (!aspirationAddress) {
      throw new NotFoundError('Aspiration address not found');
    }

    res.status(200).json({
      success: true,
      data: aspirationAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}


async function createAspirationAddress(req, res) {
  try {
    console.log('Request body:', req.body);
    const aspirationAddressSchema = z.object({
      aspiration_address: z.string().min(1, { message: 'Aspiration address is required' }),
    });

    const { aspiration_address } = aspirationAddressSchema.parse(req.body);
    const isUniqueAddress = await prisma.aspiration_Address.findUnique({
      where: { aspiration_address },
    });

    if (isUniqueAddress) throw new Error('Aspiration address already exists');

    const newAspirationAddress = await prisma.aspiration_Address.create({
      data: { aspiration_address },
    });

    res.status(201).json({
      success: true,
      data: newAspirationAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.errors || [],
    });
  }
}



async function updateAspirationAddress(req, res) {
  try {
    const aspirationAddressSchema = z.object({
      aspiration_address: z.string().min(1, { message: 'Aspiration address is required' }),
    });

    const { aspiration_address } = aspirationAddressSchema.parse(req.body);

    const existingAspirationAddress = await prisma.aspiration_Address.findUnique({
      where: { aspiration_address_id: req.params.id },
    });

    if (!existingAspirationAddress) throw new NotFoundError('Aspiration address not found');

    const updatedAspirationAddress = await prisma.aspiration_Address.update({
      where: { aspiration_address_id: req.params.id },
      data: { aspiration_address },
    });

    res.status(200).json({
      success: true,
      data: updatedAspirationAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteAspirationAddress(req, res) {
  try {
    const aspirationAddress = await prisma.aspiration_Address.findUnique({
      where: { aspiration_address_id: req.params.id },
    });

    if (!aspirationAddress) throw new NotFoundError('Aspiration address not found');

    await prisma.aspiration_Address.delete({
      where: { aspiration_address_id: req.params.id },
    });

    res.status(200).json({
      success: true,
      message: `Aspiration address with ID ${req.params.id} has been successfully deleted.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export {
  getAllAspirationAddresses,
  getAspirationAddressById,
  createAspirationAddress,
  updateAspirationAddress,
  deleteAspirationAddress,
};
