import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";
import { routes } from "../../types/constants";

const ProtectedRoutes = () => {
  const access_token = useSelector((state: RootState) => state.auth.access_token);

  return access_token ? <Outlet /> : <Navigate to={routes.LOGIN} />;
};

export default ProtectedRoutes;
