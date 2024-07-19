import { Request, Response } from "express";
import randomString from "randomstring";
import { Result, ValidationError, validationResult } from "express-validator";
import { league_types, leagues, users } from "@prisma/client";

import { generalResponse } from "../helpers/responseHelper";
import LeagueRepository from "../repositories/LeagueRepository";
import LeagueTypesRepository from "../repositories/LeagueTypesRepository";
import { IUserLeagues } from "../repositories/interfaces";
import { logger } from "../utils/logger";

const leagueRepository = new LeagueRepository();
const leagueTypesRepository = new LeagueTypesRepository();

export const createLeague = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 400, null, "payload", "Invalid Payload");
    }

    const { leagueName, type } = req.body;
    const userId = (req.user as users).id;

    const joiningCode = randomString.generate({
      length: 6,
      charset: "alphanumeric",
    });

    const leagueData = await leagueRepository.create({
      name: leagueName,
      type_id: Number(type),
      joining_code: joiningCode,
      league_users: {
        create: [
          {
            user_id: userId,
            role: "admin",
          },
        ],
      },
    });
    return generalResponse(res, 200, leagueData, "success", "League created successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};

export const getLeagueTypes = async (req: Request, res: Response) => {
  try {
    const types: league_types[] = await leagueTypesRepository.getAll();
    return generalResponse(res, 200, types, "success", "Fetched all league types successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};

export const getUserLeagues = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as users).id;
    const leagues: IUserLeagues[] = await leagueRepository.getUserLeagues(userId);

    return generalResponse(res, 200, leagues, "success", "Fetched all user leagues successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};

export const joinLeague = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 400, null, "payload", "Invalid Payload");
    }

    const { leagueCode } = req.body;
    const userId = (req.user as users).id;
    const league: leagues | null = await leagueRepository.getOne({ joining_code: leagueCode });
    if (league === null) {
      return generalResponse(res, 404, null, "not_found", "League code is invalid");
    }

    const userLeague: IUserLeagues | null = await leagueRepository.getOneUserLeague(
      userId,
      league.id
    );
    if (userLeague !== null) {
      return generalResponse(res, 409, null, "conflict", "You're already part of this team");
    }

    const addUser = await leagueRepository.updateById(league.id, {
      league_users: {
        create: {
          user_id: userId,
          role: "user",
        },
      },
    });
    return generalResponse(res, 200, addUser, "success", "Joined league successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};

export const getOneLeague = async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;
    const league: leagues | null = await leagueRepository.getOneLeague(Number(leagueId));
    if (league === null) {
      return generalResponse(res, 404, null, "not_found", "League not found");
    }

    return generalResponse(res, 200, league, "success", "League data fetched successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};

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

    const totalMatches = teams.length * teams.length - 1;
    const matchDays: number[] = [];
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};
