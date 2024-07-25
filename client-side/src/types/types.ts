export type IError = {
  type: string;
  message: string;
};

export enum LeagueRole {
  "admin",
  "user",
}

export interface IUsers {
  id: number;
  username: string;
  is_active: boolean;
}

export interface ILeagues {
  id: number;
  name: string;
  joining_code: string;
  type_id: number;
  status: string;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ILeagueUsers {
  id: number;
  user_id: number;
  league_id: number;
  role: string;
  users: IUsers;
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
  match_number: number;
  status: "pending" | "completed";
  home_team: ITeams;
  away_team: ITeams;
  match_penalty: IMatchPenalty;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface IMatchPenalty {
  id: number;
  match_id: number;
  home_team_score: number;
  away_team_score: number;
}

export interface ITeams {
  id: number;
  league_id: number;
  team_name: string;
  matches_played: number;
  matches_won: number;
  matches_lost: number;
  goals_scored: number;
  goals_conceded: number;
  points: number;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface IUserLeagues extends ILeagues {
  league_users: ILeagueUsers[];
  league_matches: ILeagueMatches[];
  teams: ITeams[];
}

export interface ITypes {
  [x: number]: string;
}

export type IModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export type IAxios = {
  url: string;
  method: string;
  data: {};
  params: {};
};

export type IApiResponse = {
  data: [] | {} | null;
  type: string;
  message: string;
};

export type IUsersProps = {
  userData: IUserLeagues | undefined;
};
