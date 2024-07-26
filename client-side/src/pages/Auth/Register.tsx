import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import registerSchema from "../../schema/registerSchema";
import { SecondaryButton } from "../../components/Buttons/Buttons";
import { IApiResponse } from "../../types/types";
import Input from "../../components/Form/Input";
import useAuthServices from "../../hooks/services/authServices";
import { SUCCESS_TYPE, routes } from "../../types/constants";

const Register = () => {
  const initialData = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [activationCode, setActivationCode] = useState<string>("");

  const navigate = useNavigate();
  const { registerApi } = useAuthServices();

  const { errors, values, handleBlur, handleChange, touched, submitForm } = useFormik({
    initialValues: initialData,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const result: IApiResponse = await registerApi(values);
      if (result?.type === SUCCESS_TYPE) {
        setActivationCode(result?.data?.verificationToken);
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
        <title>Register</title>
      </Helmet>
      <div className="w-[45%]">
        <img src="/images/register_bg.jpeg" className="h-[400px] w-[5000px]" alt="register" />
      </div>
      <div className="w-[1px] h-[370px] bg-secondary my-auto"></div>
      <div className="w-[54%]">
        <div>
          <h1 className="text-[20px] text-secondary">Welcome to,</h1>{" "}
          <h1 className="text-[35px] font-bold text-primary font-ss3">League Master</h1>
        </div>
        <div>
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
            </div>
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
              {activationCode !== "" && (
                <p
                  className="text-link mt-[10px] cursor-pointer"
                  onClick={() => navigate(`${routes.ACTIVATE}/${activationCode}`)}
                >
                  {`${process.env.REACT_APP_FRONTEND_URL}${routes.ACTIVATE}/` + activationCode}
                </p>
              )}
            </div>
            <div className="max-w-[77%] mx-auto flex justify-center mt-[40px]">
              <div onClick={submitHandler}>
                <SecondaryButton name={"Register"} />
              </div>
            </div>
          </form>
          <p className="mt-[20px] text-secondary">
            Already have an account?{" "}
            <span
              className="text-link hover:underline cursor-pointer"
              onClick={() => navigate(routes.LOGIN)}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
