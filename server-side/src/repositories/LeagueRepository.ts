import { leagues } from "@prisma/client";

import BaseRepository from "./base/BaseRepository";
import prisma from "../../prisma/script";
import { ILeague,  IUserLeagues } from "./interfaces";

export default class LeagueRepository extends BaseRepository<leagues> {
  constructor() {
    super(prisma.leagues);
  }

  async getUserLeagues(userId: number): Promise<IUserLeagues[]> {
    return await prisma.leagues.findMany({
      where: {
        league_users: {
          some: { user_id: userId, is_archived: false },
        },
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        joining_code: true,
        type_id: true,
        status: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        league_users: true,
        league_matches: {
          orderBy: { match_number: "asc" },
        },
        teams: true,
      },
    });
  }

  async getOneUserLeague(userId: number, league_id: number): Promise<IUserLeagues | null> {
    return await prisma.leagues.findFirst({
      where: {
        league_users: {
          some: { user_id: userId },
        },
        id: league_id,
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        joining_code: true,
        type_id: true,
        status: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        league_users: true,

        league_matches: {
          orderBy: { match_number: "asc" },
        },
        teams: true,
      },
    });
  }

  async getOneLeague(league_id: number): Promise<ILeague | null> {
    return await prisma.leagues.findFirst({
      where: {
        id: league_id,
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        joining_code: true,
        type_id: true,
        status: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        league_users: true,
        league_matches: {
          include: { home_team: true, away_team: true, match_penalty: true },
          orderBy: { match_number: "asc" },
        },
        teams: true,
      },
    });
  }

  async getArchivedLeagues(userId: number): Promise<IUserLeagues[]> {
    return await prisma.leagues.findMany({
      where: {
        league_users: {
          some: { user_id: userId, is_archived: true },
        },
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        joining_code: true,
        type_id: true,
        status: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        league_users: true,
        league_matches: {
          orderBy: { match_number: "asc" },
        },
        teams: true,
      },
    });
  }
}
