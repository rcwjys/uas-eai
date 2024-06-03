-- CreateIndex
CREATE INDEX `Votes_voter_name_idx` ON `Votes`(`voter_name`);

-- CreateIndex
CREATE INDEX `Votes_candidate_id_idx` ON `Votes`(`candidate_id`);
