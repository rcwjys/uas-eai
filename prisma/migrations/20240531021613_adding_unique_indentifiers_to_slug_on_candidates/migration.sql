/*
  Warnings:

  - A unique constraint covering the columns `[candidate_slug]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Candidate_candidate_slug_key` ON `Candidate`(`candidate_slug`);
