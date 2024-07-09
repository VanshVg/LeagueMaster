import { Request, Response } from "express";
import randomString from "randomstring";

import { generalResponse } from "../helpers/responseHelper";
import LeagueRepository from "../repositories/LeagueRepository";
import { Result, ValidationError, validationResult } from "express-validator";
import { league_types, users } from "@prisma/client";
import LeagueTypesRepository from "../repositories/LeagueTypesRepository";

const leagueRepository = new LeagueRepository();
const leagueTypesRepository = new LeagueTypesRepository();

export const createLeague = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 404, null, "payload", "Invalid Payload");
    }

    const { leagueName, type } = req.body;
    const userId = (req.user as users).id;

    const joiningCode = randomString.generate({
      length: 6,
      charset: "alphanumeric",
    });

    await leagueRepository.create({
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
    return generalResponse(res, 200, null, "success", "League created successfully");
  } catch (error) {
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};

export const getLeagueTypes = async (req: Request, res: Response) => {
  try {
    const types: league_types[] = await leagueTypesRepository.getAll();
    return generalResponse(res, 200, types, "success", "Fetched all league types successfully");
  } catch (error) {
    console.log(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};
