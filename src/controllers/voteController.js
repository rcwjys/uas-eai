import { PrismaClient } from '@prisma/client';
import { NotFoundError, ValidationError } from '../utils/error.js';
import { channel } from '../../config/amqp.js';


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

  const vote = await prisma.votes.findUnique({
    where: {
      vote_id: req.params.id
    }
  });

  if (!vote) throw new NotFoundError('vote is not found');

  res.status(200).json({
    success: true,
    data: {
      vote
    }
  })
}


export async function storeVotes(req, res) {

  const { candidate_id, voter_name } = req.body;

  const isValidUser = await prisma.user.findUnique({
    where: {
      username: voter_name,
      user_attempt: 1
    }
  });

  if (!isValidUser) throw new ValidationError('user is not valid or vote is used');

  const candidateIsValid = await prisma.candidate.findUnique({
    where: {
      candidate_id
    }
  });

  if (!candidateIsValid) throw new ValidationError('candidate is not valid');


  const vote = await prisma.votes.create({
    data: {
      candidate_id,
      voter_name
    }
  });

  const voting = await prisma.user.update({
    where: {
      username: voter_name
    },
    data: {
      user_attempt: 1
    }
  });


  await channel.assertExchange('votes', 'fanout', {
    durable: true, 
    autoDelete: false
  });

  channel.publish('votes', 'voteLogging', Buffer.from(JSON.stringify(vote)));

  await channel.assertQueue('voteLogging', {durable: true});

  await channel.bindQueue('voteLogging', 'votes');

  await channel.consume('voteLogging', (data) => {
    const message = JSON.parse(Buffer.from(data.content.toString()));
    console.log(`${message.voter_name} is votes ${message.candidate_id}`);
  }, {
    noAck: true
  });


  res.status(201).json({
    success: true,
    data: {
      vote
    }
  });


}

export async function deleteVotes(req, res) {

  const vote = await prisma.votes.findUnique({
    where: {
      vote_id: req.params.id
    }
  });

  if (!vote) throw new NotFoundError('vote is not found');

  const deletedVote = await prisma.votes.delete({
    where: {
      vote_id: req.params.id
    }
  });

  res.sendStatus(204);
}


