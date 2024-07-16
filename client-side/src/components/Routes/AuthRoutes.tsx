import { Navigate, Outlet } from "react-router-dom";
import Cookies, { Cookie } from "universal-cookie";

const AuthRoutes = () => {
  const cookies: Cookie = new Cookies();

  const token: string = cookies.get("token");

  return token ? <Navigate to={"/dashboard"} /> : <Outlet />;
};

export default AuthRoutes;
