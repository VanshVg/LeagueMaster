import { Request, Response } from "express";
import { leagues, teams, users } from "@prisma/client";

import { IMatchData, IUserLeagues } from "../repositories/interfaces";
import LeagueRepository from "../repositories/LeagueRepository";
import MatchRepository from "../repositories/MatchRepository";
import { generalResponse } from "../helpers/responseHelper";
import { logger } from "../utils/logger";

const leagueRepository = new LeagueRepository();
const matchRepository = new MatchRepository();

export const generateMatches = async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;
    const userId = (req.user as users).id;

    const league: IUserLeagues | null = await leagueRepository.getOneUserLeague(
      userId,
      Number(leagueId)
    );
    if (league === null) {
      return generalResponse(res, 404, null, "not_found", "League not found");
    }

    if (league.teams.length < 4) {
      return generalResponse(res, 409, null, "conflict", "Not enough teams to start tournament");
    }

    const { teams } = league;

    let totalMatches: number = teams.length * (teams.length - 1);
    const matchDays: number[] = [];
    const matchData: IMatchData[] = [];
    let matchTypeId: number = 1;

    if (league.type_id === 2) {
      matchTypeId = 2;
    }

    while (totalMatches >= 1) {
      matchDays.push(totalMatches);
      --totalMatches;
    }

    teams.forEach((homeTeam: teams, home: number) => {
      teams.forEach((awayTeam: teams, away: number) => {
        if (home !== away) {
          const index: number = Math.floor(Math.random() * matchDays.length);
          let matchDay: number = matchDays[index];
          matchDays.splice(index, 1);
          matchData.push({
            league_id: Number(leagueId),
            match_type_id: matchTypeId,
            home_team_id: homeTeam.id,
            away_team_id: awayTeam.id,
            match_number: matchDay,
          });
        }
      });
    });

    await matchRepository.createMany(matchData);
    return generalResponse(res, 200, null, "success", "Generated matches successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};

export const getMatches = async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;

    const league: leagues | null = await leagueRepository.getOne({ id: Number(leagueId) });
    if (league === null) {
      return generalResponse(res, 404, null, "not_found", "League not Found");
    }

    const matches = await matchRepository.getMatches(Number(leagueId));

    return generalResponse(res, 200, matches, "success", "Fetched matches data successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};
