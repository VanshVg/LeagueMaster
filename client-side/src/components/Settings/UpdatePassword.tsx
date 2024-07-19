import { useFormik } from "formik";
import verifySchema from "../../schema/verifySchema";
import { ChangeEvent, useEffect, useState } from "react";
import { IError } from "../../types/types";
import { SecondaryButton } from "../Buttons/Buttons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import updatePasswordSchema from "../../schema/updatePasswordSchema";
import axios from "axios";
import Swal from "sweetalert2";

const UpdatePassword = () => {
  const initialData = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [updatePasswordError, setUpdatePasswordError] = useState<IError>({ type: "", message: "" });
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const toggleCurrentPassword = (): void => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPassword = (): void => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { errors, values, touched, handleBlur, handleChange, submitForm, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: updatePasswordSchema,
    onSubmit: async (values) => {
      if (values.currentPassword === values.newPassword) {
        setUpdatePasswordError({
          type: "conflict",
          message: "Current Password and New password can't be same",
        });
        return;
      }
      Swal.fire({
        title: "Update Confirmation",
        text: "Are sure you want to change username?",
        icon: "warning",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        confirmButtonColor: "#2554c7",
        color: "#28183b",
        showLoaderOnConfirm: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.put(
              `${process.env.REACT_APP_BACKEND_URL}/user/password`,
              values,
              { withCredentials: true }
            );
            if (response.data.type === "success") {
              Swal.fire({
                title: "Success!",
                text: "Password updated successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                resetForm();
              });
            }
          } catch (error: any) {
            setUpdatePasswordError({
              type: error.response.data.type,
              message: error.response.data.message,
            });
          }
        }
      });
    },
  });

  const handleInputChange = (e: ChangeEvent): void => {
    setUpdatePasswordError({ type: "", message: "" });
    handleChange(e);
  };

  const updateUsernameSubmitHandler = (): void => {
    submitForm();
  };

  return (
    <div>
      <div className="flex max-w-[70%] rounded-[0.438rem]">
        <div className="w-[1px] h-[95%] bg-orange my-auto"></div>
        <div className="w-full">
          <div>
            <form>
              <div className="mt-[30px] ml-[20px] mx-auto">
                <div className="relative">
                  <div className="flex">
                    <div className="w-full">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-primary bg-transparent rounded-lg border-[1px] border-primary appearance-none dark:text-primary focus:text-primary dark:border-primary dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer mx-auto"
                        placeholder=""
                        autoComplete="off"
                        value={values.currentPassword}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                      <label
                        htmlFor="currentPassword"
                        className="absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                      >
                        Current Password
                      </label>
                    </div>
                    {showCurrentPassword ? (
                      <img
                        src="/icons/eye-show.svg"
                        alt="password"
                        className="-ml-[30px] cursor-pointer"
                        onClick={toggleCurrentPassword}
                      />
                    ) : (
                      <img
                        src="/icons/eye-hidden.svg"
                        alt="confirm-password"
                        className="-ml-[30px] cursor-pointer"
                        onClick={toggleCurrentPassword}
                      />
                    )}
                  </div>
                </div>
                {(errors.currentPassword && touched.currentPassword) ||
                updatePasswordError.type === "password" ? (
                  <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                    {errors.currentPassword || updatePasswordError.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-[20px] ml-[20px] mx-auto">
                <div className="relative">
                  <div className="flex">
                    <div className="w-full">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-primary bg-transparent rounded-lg border-[1px] border-primary appearance-none dark:text-primary focus:text-primary dark:border-primary dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer mx-auto"
                        placeholder=""
                        autoComplete="off"
                        value={values.newPassword}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                      <label
                        htmlFor="newPassword"
                        className="absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                      >
                        New Password
                      </label>
                    </div>
                    {showNewPassword ? (
                      <img
                        src="/icons/eye-show.svg"
                        alt="password"
                        className="-ml-[30px] cursor-pointer"
                        onClick={toggleNewPassword}
                      />
                    ) : (
                      <img
                        src="/icons/eye-hidden.svg"
                        alt="confirm-password"
                        className="-ml-[30px] cursor-pointer"
                        onClick={toggleNewPassword}
                      />
                    )}
                  </div>
                </div>
                {(errors.newPassword && touched.newPassword) ||
                updatePasswordError.type === "conflict" ? (
                  <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                    {errors.newPassword || updatePasswordError.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-[20px] ml-[20px] mx-auto">
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
                        Confirm New Password
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
                {(errors.confirmPassword && touched.confirmPassword) ||
                updatePasswordError.type === "unauthorised" ? (
                  <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                    {errors.confirmPassword || updatePasswordError.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
          <div className="inline-block mt-[35px]" onClick={updateUsernameSubmitHandler}>
            <SecondaryButton name="Update Password" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
