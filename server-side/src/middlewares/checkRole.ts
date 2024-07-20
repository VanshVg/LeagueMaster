import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import { generalResponse } from "../helpers/responseHelper";
import LeagueRepository from "../repositories/LeagueRepository";
import { users } from "@prisma/client";
import { IUserLeagues } from "../repositories/interfaces";

const leagueRepository = new LeagueRepository();

export const checkLeagueRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { leagueId } = req.params;
    const userId = (req.user as users).id;

    const leagueUser: IUserLeagues | null = await leagueRepository.getOneUserLeague(
      userId,
      Number(leagueId)
    );
    if (leagueUser === null) {
      return generalResponse(
        res,
        401,
        null,
        "unauthorised",
        "User isn't authorised to access this"
      );
    }

    next();
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal server Error");
  }
};
