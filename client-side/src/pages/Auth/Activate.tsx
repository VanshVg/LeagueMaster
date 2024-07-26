import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAuthServices from "../../hooks/services/authServices";
import { routes } from "../../types/constants";

const Activate = () => {
  const navigate = useNavigate();
  const params = useParams();

  const verificationToken: string | undefined = params.token;

  const { activateApi, isError } = useAuthServices();

  const activateAccount = async () => {
    await activateApi(verificationToken as string);
  };

  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <div>
      {!isError && (
        <div>
          <p>Your Account is activated.</p>
        </div>
      )}
      <p
        className="text-link hover:underline cursor-pointer"
        onClick={() => navigate(routes.LOGIN)}
      >
        Login
      </p>
    </div>
  );
};

export default Activate;
