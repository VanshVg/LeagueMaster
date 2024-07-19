import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./components/Routes/AuthRoutes";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import { privateRoutes, publicRoutes } from "./types/constants";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AuthRoutes />}>
            {publicRoutes.map(({ path, Element }, index) => {
              return <Route path={path} element={<Element />} key={index} />;
            })}
          </Route>
          <Route element={<ProtectedRoutes />}>
            {privateRoutes.map(({ path, Element }, index) => {
              return <Route path={path} element={<Element />} key={index} />;
            })}
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
