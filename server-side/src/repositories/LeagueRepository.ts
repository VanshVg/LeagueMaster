import { leagues } from "@prisma/client";

import BaseRepository from "./base/BaseRepository";
import prisma from "../../prisma/script";
import { IUserLeagues } from "./interfaces";

export default class LeagueRepository extends BaseRepository<leagues> {
  constructor() {
    super(prisma.leagues);
  }

  async getUserLeagues(userId: number): Promise<IUserLeagues[]> {
    return await prisma.leagues.findMany({
      where: {
        league_users: {
          every: { user_id: userId },
        },
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        joining_code: true,
        type_id: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        league_users: true,
        league_matches: true,
        teams: true,
      },
    });
  }
}
