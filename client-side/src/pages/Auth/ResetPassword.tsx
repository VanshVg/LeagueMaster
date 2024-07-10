import { ChangeEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Helmet } from "react-helmet";

import { IError } from "../../types";
import { SecondaryButton } from "../../components/Buttons/Buttons";
import resetPasswordSchema from "../../schema/resetPasswordSchema";

const ResetPassword = () => {
  const initialData = {
    password: "",
    confirmPassword: "",
  };

  const [resetError, setResetError] = useState<IError>({ type: "", message: "" });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const params = useParams();

  const resetToken: string | undefined = params.token;

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { errors, values, handleBlur, handleChange, touched, submitForm } = useFormik({
    initialValues: initialData,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/auth/reset/${resetToken}`,
          values
        );
        if (response.data.type === "success") {
          navigate("/auth/login");
        }
      } catch (error: any) {
        setResetError({ type: error.response.data.type, message: error.response.data.message });
      }
    },
  });

  const handleInputChange = (e: ChangeEvent): void => {
    setResetError({ type: "", message: "" });
    handleChange(e);
  };

  const handleSubmit = (): void => {
    setResetError({ type: "", message: "" });
    submitForm();
  };

  return (
    <div className="max-w-[70%] flex mx-auto shadow-[2px_2px_2px_2px_grey] mt-[10%] p-[10px] rounded-[0.438rem] font-poppins">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="w-[45%]">
        <img
          src="/images/change_password_bg.jpeg"
          className="h-[400px] w-[5000px]"
          alt="register"
        />
      </div>
      <div className="w-[1px] h-[370px] bg-secondary my-auto"></div>
      <div className="w-[54%]">
        <div>
          <h1 className="text-[35px] font-bold text-primary font-ss3">League Master</h1>
          <h1 className="text-[20px] text-secondary">Reset Password</h1>{" "}
        </div>
        <div className="mt-[50px]">
          <form>
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
            </div>
            <div className="mt-[20px] max-w-[77%] mx-auto">
              <div className="relative">
                <div className="flex">
                  <div className="w-full">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-primary bg-transparent rounded-lg border-[1px] border-primary appearance-none dark:text-primary focus:text-primary dark:border-primary dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer mx-auto"
                      placeholder=""
                      autoComplete="off"
                      value={values.confirmPassword}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    <label
                      htmlFor="confirmPassword"
                      className="absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                    >
                      Confirm Password
                    </label>
                  </div>
                  {showConfirmPassword ? (
                    <img
                      src="/icons/eye-show.svg"
                      alt="password"
                      className="-ml-[30px] cursor-pointer"
                      onClick={toggleConfirmPassword}
                    />
                  ) : (
                    <img
                      src="/icons/eye-hidden.svg"
                      alt="confirm-password"
                      className="-ml-[30px] cursor-pointer"
                      onClick={toggleConfirmPassword}
                    />
                  )}
                </div>
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                  {errors.confirmPassword}
                </p>
              ) : (
                ""
              )}
              {resetError.type !== "" ? (
                <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                  {resetError.message}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="max-w-[77%] mx-auto flex justify-center mt-[40px]">
              <div onClick={handleSubmit}>
                <SecondaryButton name={"Reset"} />
              </div>
            </div>
            <p className="mt-[40px] text-secondary">
              Back to login?{" "}
              <Link to={"/auth/login"} className="text-link hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
