import { ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";

import { SecondaryButton } from "../../components/Buttons/Buttons";
import resetPasswordSchema from "../../schema/resetPasswordSchema";
import Input from "../../components/Form/Input";
import { SUCCESS_TYPE, routes } from "../../types/constants";
import useAuthServices from "../../hooks/services/authServices";
import { IApiResponse } from "../../types/types";

const ResetPassword = () => {
  const initialData = {
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();
  const params = useParams();

  const resetToken: string | undefined = params.token;

  const { resetPasswordApi } = useAuthServices();

  const { errors, values, handleBlur, handleChange, touched, submitForm } = useFormik({
    initialValues: initialData,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      const result: IApiResponse = await resetPasswordApi(values, resetToken as string);
      if (result?.type === SUCCESS_TYPE) {
        navigate(routes.LOGIN);
      }
    },
  });

  const inputChangeHandler = (e: ChangeEvent): void => {
    handleChange(e);
  };

  const submitHandler = (): void => {
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
          <h1 className="text-[20px] text-secondary">Reset Password</h1>
        </div>
        <div className="mt-[50px]">
          <form>
            <div className="mt-[20px] max-w-[77%] mx-auto">
              <Input
                type="password"
                id="password"
                value={values.password}
                onChange={inputChangeHandler}
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
                onChange={inputChangeHandler}
                onBlur={handleBlur}
                label="Confirm Password"
                errors={errors.confirmPassword}
                touched={touched.confirmPassword}
              />
            </div>
            <div className="max-w-[77%] mx-auto flex justify-center mt-[40px]">
              <div onClick={submitHandler}>
                <SecondaryButton name={"Reset"} />
              </div>
            </div>
            <p className="mt-[40px] text-secondary">
              Back to login?
              <Link to={routes.LOGIN} className="text-link hover:underline">
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
