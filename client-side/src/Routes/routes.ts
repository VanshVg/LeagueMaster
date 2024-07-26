import Activate from "../pages/Auth/Activate";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ResetPassword from "../pages/Auth/ResetPassword";
import Verify from "../pages/Auth/Verify";
import Archived from "../pages/Dashboard/Archived";
import Dashboard from "../pages/Dashboard/Dashboard";
import Settings from "../pages/Dashboard/Settings";
import LandingPage from "../pages/LandingPage";
import About from "../pages/League/About";
import League from "../pages/League/League";
import Matches from "../pages/League/Matches";
import Standings from "../pages/League/Standings";
import Teams from "../pages/League/Teams";
import Users from "../pages/League/Users";
import { routes } from "../types/constants";

export const publicRoutes = [
  {
    path: routes.REGISTER,
    Element: Register,
  },
  {
    path: routes.LOGIN,
    Element: Login,
  },
  {
    path: routes.ACTIVATE + "/:token",
    Element: Activate,
  },
  {
    path: routes.VERIFY,
    Element: Verify,
  },
  {
    path: routes.RESET_PASSWORD + "/:token",
    Element: ResetPassword,
  },
];

export const privateRoutes = [
  {
    path: routes.LANDING,
    Element: LandingPage,
  },
  {
    path: routes.DASHBOARD,
    Element: Dashboard,
  },
  {
    path: routes.SETTINGS,
    Element: Settings,
  },
  {
    path: routes.ARCHIVED,
    Element: Archived,
  },
  {
    path: routes.LEAGUE + "/:leagueId",
    Element: League,
  },
  {
    path: "/league/:leagueId" + routes.LEAGUE_STANDINGS,
    Element: Standings,
  },
  {
    path: "/league/:leagueId" + routes.LEAGUE_TEAMS,
    Element: Teams,
  },
  {
    path: "/league/:leagueId" + routes.LEAGUE_MATCHES,
    Element: Matches,
  },
  {
    path: "/league/:leagueId" + routes.LEAGUE_USERS,
    Element: Users,
  },
  {
    path: "/league/:leagueId" + routes.LEAGUE_ABOUT,
    Element: About,
  },
];
