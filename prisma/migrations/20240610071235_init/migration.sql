/*
  Warnings:

  - Added the required column `candidate_vote_total` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidate` ADD COLUMN `candidate_vote_total` INTEGER NOT NULL;
