import { Helmet } from "react-helmet";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { SecondaryButton } from "../../components/Buttons/Buttons";
import { IApiResponse } from "../../types/types";
import verifySchema from "../../schema/verifySchema";
import Input from "../../components/Form/Input";
import useAuthServices from "../../hooks/services/authServices";
import { SUCCESS_TYPE, routes } from "../../types/constants";

const Verify = () => {
  const initialData = {
    username: "",
  };

  const [resetToken, setResetToken] = useState<string>("");

  const navigate = useNavigate();

  const { verifyUsernameApi } = useAuthServices();

  const { errors, values, handleBlur, handleChange, touched, submitForm } = useFormik({
    initialValues: initialData,
    validationSchema: verifySchema,
    onSubmit: async (values) => {
      const result: IApiResponse = await verifyUsernameApi(values);
      if (result?.type === SUCCESS_TYPE) {
        setResetToken(result?.data?.resetToken);
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
        <title>Forgot Password</title>
      </Helmet>
      <div className="w-[45%]">
        <img src="/images/verify_bg.jpeg" className="h-[400px] w-[5000px]" alt="register" />
      </div>
      <div className="w-[1px] h-[370px] bg-secondary my-auto"></div>
      <div className="w-[54%]">
        <div>
          <h1 className="text-[35px] font-bold text-primary font-ss3">League Master</h1>
          <h1 className="text-[20px] text-secondary">Forgot Password</h1>{" "}
        </div>
        <div className="mt-[50px]">
          <form>
            <div className="mt-[20px] max-w-[77%] mx-auto">
              <Input
                type="text"
                id="username"
                value={values.username}
                onChange={inputChangeHandler}
                onBlur={handleBlur}
                label="Username"
                errors={errors.username}
                touched={touched.username}
              />
              {resetToken !== "" && (
                <p
                  className="text-link hover:underline cursor-pointer -ml-[30px]"
                  onClick={() => navigate(`${routes.RESET_PASSWORD}/${resetToken}`)}
                >
                  {`${process.env.REACT_APP_FRONTEND_URL}${routes.RESET_PASSWORD}/${resetToken}`}
                </p>
              )}
            </div>
            <div className="max-w-[77%] mx-auto flex justify-center mt-[40px]">
              <div onClick={submitHandler}>
                <SecondaryButton name={"Verify"} />
              </div>
            </div>
            <p className="mt-[40px] text-secondary">
              Back to login?{" "}
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

export default Verify;
