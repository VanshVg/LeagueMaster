export const routes = {
  LANDING: "/",
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  ACTIVATE: "/auth/activate/:token",
  VERIFY: "/auth/verify",
  RESET_PASSWORD: "/auth/reset/:token",
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  ARCHIVED: "/archived",
  LEAGUE: "/league/:leagueId",
  LEAGUE_STANDINGS: "/league/:leagueId/standings",
};
