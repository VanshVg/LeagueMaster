import Activate from "./pages/Auth/Activate";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";
import Verify from "./pages/Auth/Verify";
import Archived from "./pages/Dashboard/Archived";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Dashboard/Settings";
import LandingPage from "./pages/LandingPage";
import About from "./pages/League/About";
import League from "./pages/League/League";
import Matches from "./pages/League/Matches";
import Standings from "./pages/League/Standings";
import Teams from "./pages/League/Teams";
import Users from "./pages/League/Users";

export const publicRoutes = [
  {
    path: "/auth/register",
    Element: Register,
  },
  {
    path: "/auth/login",
    Element: Login,
  },
  {
    path: "/auth/activate/:token",
    Element: Activate,
  },
  {
    path: "/auth/verify",
    Element: Verify,
  },
  {
    path: "/auth/reset/:token",
    Element: ResetPassword,
  },
];

export const privateRoutes = [
  {
    path: "/",
    Element: LandingPage,
  },
  {
    path: "/dashboard",
    Element: Dashboard,
  },
  {
    path: "/settings",
    Element: Settings,
  },
  {
    path: "/archived",
    Element: Archived,
  },
  {
    path: "/league/:leagueId",
    Element: League,
  },
  {
    path: "/league/:leagueId/standings",
    Element: Standings,
  },
  {
    path: "/league/:leagueId/teams",
    Element: Teams,
  },
  {
    path: "/league/:leagueId/matches",
    Element: Matches,
  },
  {
    path: "/league/:leagueId/users",
    Element: Users,
  },
  {
    path: "/league/:leagueId/about",
    Element: About,
  },
];
