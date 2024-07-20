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

export interface IMatchData {
  league_id: number;
  match_type_id: number;
  home_team_id: number;
  away_team_id: number;
  match_number: number;
}
