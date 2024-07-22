import { Request, Response } from "express";
import { league_matches, leagues, teams, users } from "@prisma/client";

import { IMatchData, IUserLeagues } from "../repositories/interfaces";
import LeagueRepository from "../repositories/LeagueRepository";
import MatchRepository from "../repositories/MatchRepository";
import { generalResponse } from "../helpers/responseHelper";
import { logger } from "../utils/logger";
import TeamRepository from "../repositories/TeamRepository";

const leagueRepository = new LeagueRepository();
const matchRepository = new MatchRepository();
const teamRepository = new TeamRepository();

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

export const updateResult = async (req: Request, res: Response) => {
  try {
    const { matchId } = req.params;
    const { home_team_score, away_team_score, extra_time, penalties } = req.body;

    const match: league_matches | null = await matchRepository.getOne({ id: Number(matchId) });
    if (match === null) {
      return generalResponse(res, 404, null, "not_found", "Match not found");
    }
    await matchRepository.updateById(Number(matchId), {
      home_team_score: Number(home_team_score),
      away_team_score: Number(away_team_score),
      extra_time: extra_time,
      penalties: penalties,
      status: "completed",
    });
    if (penalties) {
      await matchRepository.updatePenaltyScore(Number(matchId), {
        homeTeamScore: Number(req.body.home_team_penalty),
        awayTeamScore: Number(req.body.away_team_penalty),
      });
    }

    let homeWin: number = 0;
    let awayWin: number = 0;
    let homeTeamPoints: number = 0;
    let awayTeamPoints: number = 0;
    if (home_team_score > away_team_score) {
      homeWin = 1;
      homeTeamPoints = 3;
    } else if (away_team_score > home_team_score) {
      awayWin = 1;
      awayTeamPoints = 3;
    } else {
      if (penalties) {
        if (req.body.home_team_penalty > req.body.away_team_penalty) {
          homeWin = 1;
        } else {
          awayWin = 1;
        }
      } else {
        homeTeamPoints = 1;
        awayTeamPoints = 1;
      }
    }

    await teamRepository.updateById(match.home_team_id, {
      matches_played: { increment: 1 },
      matches_won: { increment: homeWin },
      matches_lost: { increment: awayWin },
      goals_scored: { increment: Number(home_team_score) },
      goals_conceded: { increment: Number(away_team_score) },
      points: { increment: homeTeamPoints },
    });

    await teamRepository.updateById(match.away_team_id, {
      matches_played: { increment: 1 },
      matches_won: { increment: awayWin },
      matches_lost: { increment: homeWin },
      goals_scored: { increment: Number(away_team_score) },
      goals_conceded: { increment: Number(home_team_score) },
      points: { increment: awayTeamPoints },
    });

    return generalResponse(res, 200, null, "success", "Updated result successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};
