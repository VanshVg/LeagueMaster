-- AlterTable
ALTER TABLE "knockouts" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "league_matches" ALTER COLUMN "home_team_score" DROP NOT NULL,
ALTER COLUMN "away_team_score" DROP NOT NULL,
ALTER COLUMN "extra_time" DROP NOT NULL,
ALTER COLUMN "penalties" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "league_types" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "leagues" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "match_types" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "teams" ALTER COLUMN "matches_played" DROP NOT NULL,
ALTER COLUMN "matches_won" DROP NOT NULL,
ALTER COLUMN "matches_lost" DROP NOT NULL,
ALTER COLUMN "goals_scored" DROP NOT NULL,
ALTER COLUMN "goals_conceded" DROP NOT NULL,
ALTER COLUMN "points" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "reset_token" DROP NOT NULL,
ALTER COLUMN "reset_time" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL;
