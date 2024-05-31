import { PrismaClient } from "@prisma/client";
import {z} from 'zod';
import { NotFoundError, ValidationError } from "../utils/error.js";

const prisma = new PrismaClient();

async function getCandidate(req, res) {
  
  const candidates = await prisma.candidate.findMany({
    orderBy: {
      candidate_name: 'asc'
    }
  });

  return res.status(200).json({
    success: true,
    data: candidates
  });
}

async function getCandidateDetail(req, res) {
  const candidate = await prisma.candidate.findUnique({
    where: {
      candidate_slug: req.params.candidate_name.toLowerCase().replace(/\s+/g, '-')
    }
  });

  if (!candidate) throw new NotFoundError('candidate not found');

  res.status(200).json({
    success: true,
    data: {
      candidate
    }
  })
}

async function storeCandidate(req, res) {

  const candidatesSchema = z.object({
    candidate_name: z.string().min(1, { message: "Candidate name is required" }),
    candidate_biography: z.string().min(1, { message: "Candidate biography is required" }),
    candidate_vision: z.string().min(1, { message: "Candidate vision is required" }),
    candidate_mission: z.string().min(1, { message: "Candidate mission is required" }),
  });

  
  const { candidate_name, candidate_biography, candidate_vision, candidate_mission } = candidatesSchema.parse(req.body);

  const isUniqueCandidate = await prisma.candidate.findUnique({
    where: {
      candidate_name
    }
  });

  if (isUniqueCandidate) throw new ValidationError('candidate is already exists');

  const candidate = await prisma.candidate.create({
    data: {
      candidate_name,
      candidate_biography,
      candidate_vision,
      candidate_mission,
      candidate_slug: candidate_name.toLowerCase().replace(/\s+/g, '-')
    },
  });

  res.status(201).json({
    success: true, 
    data: candidate
  });

}

async function updateCandidate(req, res) {

  const { candidate_name, candidate_biopgraphy, candidate_vision, candidate_mission } = req.body;

  const candidate = await prisma.candidate.findUnique({
    where: {
      candidate_id: req.params.id
    }
  });

  if (!candidate) throw new NotFoundError('candidate is not found');

  const updatedCandidate = await prisma.candidate.update({
    where: {
      candidate_id: req.params.id
    },
    data: {
      candidate_name,
      candidate_biopgraphy,
      candidate_mission,
      candidate_vision,
      candidate_slug: candidate_name.toLowerCase().replace(/\s+/g, '-')
    }
  });

  res.status(201).json({
    success: true,
    data: updatedCandidate
  })
}


async function deleteCandidate(req, res) {

  const candidate = await prisma.candidate.findUnique({
    where: {
      candidate_id: req.params.id
    }
  });

  if (!candidate) throw NotFoundError('candidate is not found');

  const deletedCandidate = await prisma.candidate.delete({
    where: {
      candidate_id: req.params.id
    }
  });

  res.sendStatus(204);
}


export { getCandidate, storeCandidate, updateCandidate, deleteCandidate, getCandidateDetail};