import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Auth/Register";
import Activate from "./pages/Auth/Activate";
import Login from "./pages/Auth/Login";
import Verify from "./pages/Auth/Verify";
import ResetPassword from "./pages/Auth/ResetPassword";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/activate/:token" element={<Activate />} />
          <Route path="/auth/verify" element={<Verify />} />
          <Route path="/auth/reset/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
