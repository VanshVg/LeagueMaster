import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./components/Routes/AuthRoutes";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import { privateRoutes, publicRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        theme="dark"
      />
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
