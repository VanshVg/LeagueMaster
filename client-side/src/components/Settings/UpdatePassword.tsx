import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import { IError } from "../../types/types";
import { SecondaryButton } from "../Buttons/Buttons";
import updatePasswordSchema from "../../schema/updatePasswordSchema";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "../Form/Input";

const UpdatePassword = () => {
  const initialData = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [updatePasswordError, setUpdatePasswordError] = useState<IError>({ type: "", message: "" });

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
                <Input
                  type="password"
                  id="currentPassword"
                  value={values.currentPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  label="Current Password"
                  errors={errors.currentPassword}
                  touched={touched.currentPassword}
                />
              </div>
              <div className="mt-[20px] ml-[20px] mx-auto">
                <Input
                  type="password"
                  id="newPassword"
                  value={values.newPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  label="New Password"
                  errors={errors.newPassword}
                  touched={touched.newPassword}
                />
              </div>
              <div className="mt-[20px] ml-[20px] mx-auto">
                <Input
                  type="password"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  label="Confirm New Password"
                  errors={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
              </div>
              {updatePasswordError.type !== "" && (
                <p className="mt-[2px] ml-[20px] text-left text-[15px] text-red">
                  {updatePasswordError.message}
                </p>
              )}
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
