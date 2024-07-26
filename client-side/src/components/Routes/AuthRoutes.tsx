import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";
import { routes } from "../../types/constants";

const AuthRoutes = () => {
  const access_token = useSelector((state: RootState) => state.auth.access_token);

  return access_token ? <Navigate to={routes.DASHBOARD} /> : <Outlet />;
};

export default AuthRoutes;
