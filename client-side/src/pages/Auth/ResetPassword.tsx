import { ChangeEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Helmet } from "react-helmet";

import { IError } from "../../types/types";
import { SecondaryButton } from "../../components/Buttons/Buttons";
import resetPasswordSchema from "../../schema/resetPasswordSchema";
import Input from "../../components/Form/Input";

const ResetPassword = () => {
  const initialData = {
    password: "",
    confirmPassword: "",
  };

  const [resetError, setResetError] = useState<IError>({ type: "", message: "" });

  const navigate = useNavigate();
  const params = useParams();

  const resetToken: string | undefined = params.token;

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
            </div>
            <div className="mt-[20px] max-w-[77%] mx-auto">
              <Input
                type="password"
                id="confirmPassword"
                value={values.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                label="Confirm Password"
                errors={errors.confirmPassword}
                touched={touched.confirmPassword}
              />
              {resetError.type !== "" && (
                <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                  {resetError.message}
                </p>
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
