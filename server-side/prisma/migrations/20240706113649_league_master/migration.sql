-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "verification_token" TEXT NOT NULL,
    "reset_token" TEXT NOT NULL,
    "reset_time" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "league_types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "league_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leagues" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "joining_code" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leagues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "league_users" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "league_id" INTEGER NOT NULL,

    CONSTRAINT "league_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "league_id" INTEGER NOT NULL,
    "team_name" TEXT NOT NULL,
    "matches_played" INTEGER NOT NULL,
    "matches_won" INTEGER NOT NULL,
    "matches_lost" INTEGER NOT NULL,
    "goals_scored" INTEGER NOT NULL,
    "goals_conceded" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "match_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "league_matches" (
    "id" SERIAL NOT NULL,
    "league_id" INTEGER NOT NULL,
    "match_type_id" INTEGER NOT NULL,
    "home_team_id" INTEGER NOT NULL,
    "away_team_id" INTEGER NOT NULL,
    "home_team_score" INTEGER NOT NULL,
    "away_team_score" INTEGER NOT NULL,
    "extra_time" BOOLEAN NOT NULL,
    "penalties" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "league_matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_penalty_scores" (
    "id" SERIAL NOT NULL,
    "match_id" INTEGER NOT NULL,

    CONSTRAINT "match_penalty_scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "leagues_joining_code_key" ON "leagues"("joining_code");

-- AddForeignKey
ALTER TABLE "leagues" ADD CONSTRAINT "leagues_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "league_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_users" ADD CONSTRAINT "league_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_users" ADD CONSTRAINT "league_users_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "leagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "leagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_matches" ADD CONSTRAINT "league_matches_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "leagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_matches" ADD CONSTRAINT "league_matches_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_matches" ADD CONSTRAINT "league_matches_away_team_id_fkey" FOREIGN KEY ("away_team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
