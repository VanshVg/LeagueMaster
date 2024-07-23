import { Request, Response } from "express";
import { logger } from "../utils/logger";
import { generalResponse } from "../helpers/responseHelper";
import LeagueRepository from "../repositories/LeagueRepository";
import { teams, users } from "@prisma/client";
import { IUserLeagues } from "../repositories/interfaces";
import TeamRepository from "../repositories/TeamRepository";

const leagueRepository = new LeagueRepository();
const teamRepository = new TeamRepository();

export const addTeams = async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;
    const { teams } = req.body;

    const teamsData = teams.map((teamName: string) => ({
      league_id: Number(leagueId),
      team_name: teamName,
    }));

    await leagueRepository.createTeams(teamsData);

    return generalResponse(res, 200, null, "success", "Created teams successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};

export const teamStandings = async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;
    const userId = (req.user as users).id;

    const leagueUser: IUserLeagues | null = await leagueRepository.getOneUserLeague(
      userId,
      Number(leagueId)
    );
    if (leagueUser === null) {
      return generalResponse(res, 404, null, "not_found", "League not found");
    }

    const teams: teams[] = await teamRepository.getAll({
      where: { league_id: Number(leagueId) },
      orderBy: [
        { points: "desc" },
        { goals_scored: "desc" },
        { goals_conceded: "asc" },
        { matches_won: "desc" },
        { matches_lost: "asc" },
        { team_name: "asc" },
      ],
    });

    return generalResponse(res, 200, teams, "success", "Fetched teams data successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal server error");
  }
};
