import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { NotFoundError } from "../utils/error.js";

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
      message: "Failed to fetch aspiration",
      error: error.message,
    });
  }
};

async function getAspirationById(req, res) {
  try {
    console.log("ID parameter:", req.params.id);

    const aspiration = await prisma.aspiration.findUnique({
      where: { aspiration_id: req.params.id },
    });

    if (!aspiration) {
      throw new NotFoundError("Aspiration not found");
    }

    res.status(200).json({
      success: true,
      data: aspiration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

async function getAspirationByName(req, res) {
  try {
    const usernameSchema = z.object({
      username: z.string().min(1, { message: "Username is required" }),
    });

    const { username } = usernameSchema.parse(req.params);

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        aspirations: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    res.status(200).json({
      success: true,
      data: user.aspirations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.errors || [],
    });
  }
}



async function createAspiration(req, res) {
  try {
    console.log("Request body:", req.body);

    const aspirationSchema = z.object({
      aspiration: z.string().min(1, { message: "Aspiration is required" }),
      user_id: z.string().uuid({ message: "Invalid user ID" }),
      aspiration_address_id: z
        .string()
        .uuid({ message: "Invalid aspiration ID" }),
    });

    const { aspiration, user_id, aspiration_address_id } =
      aspirationSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { user_id },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const aspirationAddress = await prisma.aspiration_Address.findUnique({
      where: { aspiration_address_id },
    });

    if (!aspirationAddress) {
      throw new NotFoundError("Aspiration Address not found");
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
}

async function updateAspiration(req, res) {
  try {
    console.log("Request body:", req.body);

    const aspirationSchema = z.object({
      aspiration: z.string().min(1, { message: "Aspiration is required" }),
      user_id: z.string().uuid({ message: "Invalid user ID" }),
      aspiration_status: z.enum(["pending", "approved", "rejected"]),
      aspiration_address_id: z
        .string()
        .uuid({ message: "Invalid aspiration ID" }),
    });

    const validatedData = aspirationSchema.parse(req.body);

    const existingAspiration = await prisma.aspiration.findUnique({
      where: { aspiration_id: req.params.id },
    });

    if (!existingAspiration) throw new NotFoundError("Aspiration not found");

    const updatedAspiration = await prisma.aspiration.update({
      where: { aspiration_id: req.params.id },
      data: validatedData,
    });

    res.status(200).json({
      success: true,
      data: updatedAspiration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateAspirationStatus(req, res) {
  try {
    const aspirationStatusSchema = z.object({
      aspiration_status: z.enum(["pending", "approved", "rejected"], {
        message: "Invalid status",
      }),
    });

    const { aspiration_status } = aspirationStatusSchema.parse(req.body);

    const existingAspiration = await prisma.aspiration.findUnique({
      where: { aspiration_id: req.params.id },
    });

    if (!existingAspiration) throw new NotFoundError("Aspiration not found");

    const updatedAspiration = await prisma.aspiration.update({
      where: { aspiration_id: req.params.id },
      data: { aspiration_status },
    });

    res.status(200).json({
      success: true,
      data: updatedAspiration,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.errors || [],
    });
  }
}

async function deleteAspiration(req, res) {
  try {
    const aspiration = await prisma.aspiration.findUnique({
      where: { aspiration_id: req.params.id },
    });

    if (!aspiration) throw new NotFoundError("Aspiration address not found");

    await prisma.aspiration.delete({
      where: { aspiration_id: req.params.id },
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

async function getUserById(req, res) {
  try {
    const user_idSchema = z.object({
      user_id: z.string().uuid({ message: "Invalid user ID" }),
    });

    const { user_id } = user_idSchema.parse(req.params);

    const user = await prisma.user.findUnique({
      where: { user_id },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.errors || [],
    });
  }
}

export {
  getAllAspiration,
  createAspiration,
  getAspirationById,
  updateAspiration,
  deleteAspiration,
  getAspirationByName,
  getUserById,

};
