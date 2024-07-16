export type IError = {
  type: string;
  message: string;
};

enum LeagueRole {
  admin,
  user,
}

export interface ILeagues {
  id: number;
  name: string;
  joining_code: string;
  type_id: number;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ILeagueUsers {
  id: number;
  user_id: number;
  league_id: number;
  role: LeagueRole;
}

export interface ILeagueMatches {
  id: number;
  league_id: number;
  match_type_id: number;
  home_team_id: number;
  away_team_id: number;
  home_team_score: number | null;
  away_team_score: number | null;
  extra_time: boolean | null;
  penalties: boolean | null;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ITeams {
  id: number;
  league_id: number;
  team_name: string;
  matches_played: number | null;
  matches_won: number | null;
  matches_lost: number | null;
  goals_scored: number | null;
  goals_conceded: number | null;
  points: number | null;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface IUserLeagues extends ILeagues {
  league_users: ILeagueUsers[];
  league_matches: ILeagueMatches[];
  teams: ITeams[];
}

export interface ILeagueTypes {
  [x: number]: string;
}
