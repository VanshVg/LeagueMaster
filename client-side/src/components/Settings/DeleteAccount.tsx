import { ChangeEvent, useState } from "react";
import { SecondaryButton } from "../Buttons/Buttons";
import { useFormik } from "formik";
import deleteAccountSchema from "../../schema/deleteAccountSchema";
import { IError } from "../../types/types";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const initialData = {
    currentPassword: "",
  };

  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [deleteAccountError, setDeleteAccountError] = useState<IError>({ type: "", message: "" });

  const toggleCurrentPassword = (): void => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const navigate = useNavigate();

  const { errors, values, handleBlur, touched, handleChange, submitForm, resetForm } = useFormik({
    initialValues: initialData,
    validationSchema: deleteAccountSchema,
    onSubmit: async (values) => {
      Swal.fire({
        title: "Delete Confirmation",
        text: "Are sure you want to delete your account?",
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
              `${process.env.REACT_APP_BACKEND_URL}/user/remove`,
              values,
              { withCredentials: true }
            );
            if (response.data.type === "success") {
              Swal.fire({
                title: "Logout Successful",
                text: "Logout Successful",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                navigate("/");
              });
            }
          } catch (error: any) {
            setDeleteAccountError({
              type: error.response.data.type,
              message: error.response.data.message,
            });
          }
        }
      });
    },
  });

  const handleInputChange = (e: ChangeEvent): void => {
    setDeleteAccountError({ type: "", message: "" });
    handleChange(e);
  };

  const deleteAccountHandler = (): void => {
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
                deleteAccountError.type !== "" ? (
                  <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                    {errors.currentPassword || deleteAccountError.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
          <div className="inline-block mt-[35px]" onClick={deleteAccountHandler}>
            <SecondaryButton name="Delete Account" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
