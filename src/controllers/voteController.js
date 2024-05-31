import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function getVotes(req, res) {
  const votes = await prisma.votes.findMany();

  res.status(200).json({
    success: true,
    data: {
      votes
    }
  })
}

export async function getDetailsVotes(req, res) {

}


export async function storeVotes(req, res) {

}


export async function deleteVotes(req, res) {

}


