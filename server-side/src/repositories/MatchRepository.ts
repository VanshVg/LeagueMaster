import { league_matches } from "@prisma/client";
import BaseRepository from "./base/BaseRepository";
import prisma from "../../prisma/script";

export default class MatchRepository extends BaseRepository<league_matches> {
  constructor() {
    super(prisma.league_matches);
  }

  async getMatches(league_id: number) {
    return await prisma.league_matches.findMany({
      where: { league_id: league_id },
      include: {
        home_team: true,
        away_team: true,
        match_penalty: true,
      },
      orderBy: {
        match_number: "asc",
      },
    });
  }

  async updatePenaltyScore(match_id: number, data: Record<string, any>) {
    return await prisma.match_penalty_scores.create({
      data: {
        home_team_score: data.homeTeamScore,
        away_team_score: data.awayTeamScore,
        match_id: match_id,
      },
    });
  }
}
