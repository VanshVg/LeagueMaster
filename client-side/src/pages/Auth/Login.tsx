import { Helmet } from "react-helmet";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "universal-cookie";

import { SecondaryButton } from "../../components/Buttons/Buttons";
import { IError } from "../../types";
import loginSchema from "../../schema/loginSchema";

const Login = () => {
  const initialData = {
    username: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<IError>({ type: "", message: "" });

  const navigate = useNavigate();
  const cookies = new Cookies();

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  };

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
            <div className="mt-[20px] max-w-[77%] mx-auto">
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-primary bg-transparent rounded-lg border-[1px] border-primary appearance-none dark:text-primary focus:text-primary dark:border-primary dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer mx-auto"
                  placeholder=""
                  autoComplete="off"
                  value={values.username}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                <label
                  htmlFor="username"
                  className="absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                >
                  Username
                </label>
              </div>
              {errors.username && touched.username ? (
                <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                  {errors.username}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mt-[20px] max-w-[77%] mx-auto">
              <div className="relative">
                <div className="flex">
                  <div className="w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-primary bg-transparent rounded-lg border-[1px] border-primary appearance-none dark:text-primary focus:text-primary dark:border-primary dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer mx-auto"
                      placeholder=""
                      autoComplete="off"
                      value={values.password}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    <label
                      htmlFor="password"
                      className="absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                    >
                      Password
                    </label>
                  </div>
                  {showPassword ? (
                    <img
                      src="/icons/eye-show.svg"
                      alt="password"
                      className="-ml-[30px] cursor-pointer"
                      onClick={togglePassword}
                    />
                  ) : (
                    <img
                      src="/icons/eye-hidden.svg"
                      alt="confirm-password"
                      className="-ml-[30px] cursor-pointer"
                      onClick={togglePassword}
                    />
                  )}
                </div>
              </div>
              {errors.password && touched.password ? (
                <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                  {errors.password}
                </p>
              ) : (
                ""
              )}
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
