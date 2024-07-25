import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import registerSchema from "../../schema/registerSchema";
import { SecondaryButton } from "../../components/Buttons/Buttons";
import { IError } from "../../types/types";
import Input from "../../components/Form/Input";

const Register = () => {
  const initialData = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [registerError, setRegisterError] = useState<IError>({ type: "", message: "" });
  const [activationCode, setActivationCode] = useState<string>("");

  const navigate = useNavigate();

  const { errors, values, handleBlur, handleChange, touched, submitForm } = useFormik({
    initialValues: initialData,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
          values
        );
        if (response.data.type === "success") {
          setActivationCode(response.data.data.verificationToken);
        }
      } catch (error: any) {
        setRegisterError({ type: error.response.data.type, message: error.response.data.message });
      }
    },
  });

  const handleInputChange = (e: ChangeEvent): void => {
    setRegisterError({ type: "", message: "" });
    handleChange(e);
  };

  const handleSubmit = (): void => {
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
              {activationCode !== "" && (
                <p
                  className="text-link mt-[10px] cursor-pointer"
                  onClick={() => navigate(`/auth/activate/${activationCode}`)}
                >
                  {`http://192.168.18.45:3000/auth/activate/` + activationCode}
                </p>
              )}
            </div>
            <div className="max-w-[77%] mx-auto flex justify-center mt-[40px]">
              <div onClick={handleSubmit}>
                <SecondaryButton name={"Register"} />
              </div>
            </div>
          </form>
          <p className="mt-[20px] text-secondary">
            Already have an account?{" "}
            <span
              className="text-link hover:underline cursor-pointer"
              onClick={() => navigate("/auth/login")}
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
