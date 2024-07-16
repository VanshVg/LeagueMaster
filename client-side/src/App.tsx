import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Auth/Register";
import Activate from "./pages/Auth/Activate";
import Login from "./pages/Auth/Login";
import Verify from "./pages/Auth/Verify";
import ResetPassword from "./pages/Auth/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Dashboard/Settings";
import AuthRoutes from "./components/Routes/AuthRoutes";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import League from "./pages/League/League";
import Standings from "./pages/League/Standings";
import Teams from "./pages/League/Teams";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/activate/:token" element={<Activate />} />
            <Route path="/auth/verify" element={<Verify />} />
            <Route path="/auth/reset/:token" element={<ResetPassword />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/league/:leagueId" element={<League />} />
            <Route path="/league/:leagueId/standings" element={<Standings />} />
            <Route path="/league/:leagueId/teams" element={<Teams />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
