import { ChangeEvent, useState } from "react";
import { SecondaryButton } from "../Buttons/Buttons";
import { useFormik } from "formik";
import deleteAccountSchema from "../../schema/deleteAccountSchema";
import { IError } from "../../types/types";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Input from "../Form/Input";
import Cookies from "universal-cookie";

const DeleteAccount = () => {
  const initialData = {
    currentPassword: "",
  };

  const [deleteAccountError, setDeleteAccountError] = useState<IError>({ type: "", message: "" });

  const navigate = useNavigate();
  const cookies = new Cookies();

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
              cookies.remove("token");
              Swal.fire({
                title: "Delete Successful",
                text: "Account deleted successfully",
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
              {deleteAccountError.type !== "" && (
                <p className="mt-[2px] ml-[20px] text-left text-[15px] text-red">
                  {deleteAccountError.message}
                </p>
              )}
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
