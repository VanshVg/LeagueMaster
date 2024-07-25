import { Helmet } from "react-helmet";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "universal-cookie";

import { SecondaryButton } from "../../components/Buttons/Buttons";
import { IError } from "../../types/types";
import loginSchema from "../../schema/loginSchema";
import Input from "../../components/Form/Input";

const Login = () => {
  const initialData = {
    username: "",
    password: "",
  };

  const [loginError, setLoginError] = useState<IError>({ type: "", message: "" });

  const navigate = useNavigate();
  const cookies = new Cookies();

  const { errors, values, handleBlur, handleChange, touched, submitForm } = useFormik({
    initialValues: initialData,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
          values
        );
        if (response.data.type === "success") {
          cookies.set("token", response.data.data.token, { path: "/" });
          navigate("/dashboard");
        }
      } catch (error: any) {
        setLoginError({ type: error.response.data.type, message: error.response.data.message });
      }
    },
  });

  const handleInputChange = (e: ChangeEvent): void => {
    setLoginError({ type: "", message: "" });
    handleChange(e);
  };

  const handleSubmit = (): void => {
    submitForm();
  };

  return (
    <div className="max-w-[70%] flex mx-auto shadow-[2px_2px_2px_2px_grey] mt-[10%] p-[10px] rounded-[0.438rem] font-poppins">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-[45%]">
        <img src="/images/login_bg.jpg" className="h-[400px] w-[5000px]" alt="register" />
      </div>
      <div className="w-[1px] h-[370px] bg-secondary my-auto"></div>
      <div className="w-[54%]">
        <div>
          <h1 className="text-[20px] text-secondary">Welcome Back to,</h1>{" "}
          <h1 className="text-[35px] font-bold text-primary font-ss3">League Master</h1>
        </div>
        <div>
          <form>
            <div className="max-w-[77%] mt-[20px] mx-auto">
              <Input
                type="text"
                id="username"
                value={values.username}
                onChange={handleInputChange}
                onBlur={handleBlur}
                label="Username"
                errors={errors.username}
                touched={touched.username}
              />
            </div>
            <div className="mt-[20px] max-w-[77%] mx-auto">
              <Input
                type="password"
                id="password"
                value={values.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                label="Password"
                errors={errors.password}
                touched={touched.password}
              />
              {loginError.type === "credentials" ? (
                <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                  {loginError.message}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="max-w-[77%] mx-auto flex justify-center mt-[40px]">
              <div onClick={handleSubmit}>
                <SecondaryButton name={"Login"} />
              </div>
            </div>
          </form>
          <p className="mt-[30px] text-secondary">
            Forgot password?{" "}
            <span
              className="text-link hover:underline cursor-pointer"
              onClick={() => navigate("/auth/verify")}
            >
              Reset
            </span>
          </p>
          <p className="mt-[20px] text-secondary">
            New to league master?{" "}
            <span
              className="text-link hover:underline cursor-pointer"
              onClick={() => navigate("/auth/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
