import { Navigate, Outlet } from "react-router-dom";
import Cookies, { Cookie } from "universal-cookie";

const ProtectedRoutes = () => {
  const cookies: Cookie = new Cookies();

  const token: string = cookies.get("token");

  return token ? <Outlet /> : <Navigate to={"/auth/login"} />;
};

export default ProtectedRoutes;
