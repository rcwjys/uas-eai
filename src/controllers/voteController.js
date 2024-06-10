import { PrismaClient } from "@prisma/client";
import { NotFoundError, ValidationError } from "../utils/error.js";
import { channel } from "../../config/amqp.js";

const prisma = new PrismaClient();

export async function getVotes(req, res) {
  const votes = await prisma.vote.findMany();

  res.status(200).json({
    success: true,
    data: {
      votes,
    },
  });
}

export async function getDetailsVotes(req, res) {
  const vote = await prisma.vote.findUnique({
    where: {
      vote_id: req.params.id,
    },
  });

  if (!vote) throw new NotFoundError("vote is not found");

  res.status(200).json({
    success: true,
    data: {
      vote,
    },
  });
}

export async function storeVotes(req, res) {
  const { candidate_id, user_id } = req.body;

  const isValidUser = await prisma.user.findUnique({
    where: {
      user_id,
      user_attempt: 1,
    },
  });

  if (!isValidUser)
    throw new ValidationError("user is not valid or vote is used");

  const candidateIsValid = await prisma.candidate.findUnique({
    where: {
      candidate_id,
    },
  });

  if (!candidateIsValid) throw new ValidationError("candidate is not valid");

  const vote = await prisma.vote.create({
    data: {
      candidate_id,
      voter_id: user_id,
    },
  });

  await prisma.user.update({
    where: {
      user_id,
    },
    data: {
      user_attempt: 0,
    },
  });

  await prisma.candidate.update({
    where: {
      candidate_id
    },
    data: {
      candidate_vote_total: {
        increment: 1
      }
    }
  });

  await channel.assertExchange("votes", "fanout", {
    durable: true,
    autoDelete: false,
  });

  channel.publish("votes", "voteLogging", Buffer.from(JSON.stringify(vote)));

  await channel.assertQueue("voteLogging", { durable: true });

  await channel.bindQueue("voteLogging", "votes");

  await channel.consume(
    "voteLogging",
    (data) => {
      const message = JSON.parse(Buffer.from(data.content.toString()));
      console.log(
        `${message.voter_id} is votes ${message.candidate_id} at ${message.created_at}, Total Votes is ${message.candidate_vote_total}`
      );
    },
    {
      noAck: true,
    }
  );

  res.status(201).json({
    success: true,
    data: {
      vote,
    },
  });
}

export async function deleteVotes(req, res) {
  const vote = await prisma.vote.findUnique({
    where: {
      vote_id: req.params.id,
    },
  });

  if (!vote) throw new NotFoundError("vote is not found");

  const deletedVote = await prisma.vote.delete({
    where: {
      vote_id: req.params.id,
    },
  });

  res.sendStatus(204);
}
