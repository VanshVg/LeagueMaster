import { useEffect, useState } from "react";
import { IError } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Activate = () => {
  const [activateError, setActivateError] = useState<IError>({ type: "", message: "" });

  const navigate = useNavigate();
  const params = useParams();

  const verificationToken: string | undefined = params.token;

  const activateAccount = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/auth/activate/${verificationToken}`);
    } catch (error: any) {
      setActivateError({ type: error.response.data.type, message: error.response.data.message });
    }
  };

  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <div>
      {activateError.type !== "" ? (
        <div>
          <p className="text-red">{activateError.message}</p>
        </div>
      ) : (
        <div>
          <p>Your Account is activated.</p>
        </div>
      )}
      <p
        className="text-link hover:underline cursor-pointer"
        onClick={() => navigate("/auth/login")}
      >
        Login
      </p>
    </div>
  );
};

export default Activate;
