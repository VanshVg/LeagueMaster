import { league_matches, league_users, leagues, teams } from "@prisma/client";

export interface IUserLeagues extends leagues {
  league_users: league_users[];
  league_matches: league_matches[];
  teams: teams[];
}

export interface ILeague extends leagues {
  league_users: league_users[];
  league_matches: league_matches[];
  teams: teams[];
}

export interface ITeamsData {
  league_id: number;
  team_name: string;
}
