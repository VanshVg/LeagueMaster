import { useFormik } from "formik";
import verifySchema from "../../schema/verifySchema";
import { ChangeEvent, useEffect, useState } from "react";
import { IError } from "../../types";
import { SecondaryButton } from "../Buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import Swal from "sweetalert2";
import { setProfile } from "../../redux/reducers/userReducer";
import Cookies, { Cookie } from "universal-cookie";

const UpdateUsername = () => {
  const username = useSelector((state: RootState) => state.user.username);

  const initialData = {
    username: username,
  };

  const [updateUsernameError, setUpdateUsernameError] = useState<IError>({ type: "", message: "" });

  const dispatch = useDispatch();
  const cookies: Cookie = new Cookies();

  const { errors, values, touched, handleBlur, handleChange, submitForm } = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: verifySchema,
    onSubmit: async (values) => {
      if (values.username === username) {
        setUpdateUsernameError({
          type: "username",
          message: "New username can't be same as current one",
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
              `${process.env.REACT_APP_BACKEND_URL}/user/username`,
              values,
              { withCredentials: true }
            );
            if (response.data.type === "success") {
              cookies.set("token", response.data.data);
              dispatch(setProfile({ username: values.username }));
              Swal.fire({
                title: "Success!",
                text: "Username updated successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          } catch (error: any) {
            setUpdateUsernameError({
              type: error.response.data.type,
              message: error.response.data.message,
            });
          }
        }
      });
    },
  });

  const handleProfileChange = (e: ChangeEvent): void => {
    setUpdateUsernameError({ type: "", message: "" });
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
              <div className="mt-[30px] ml-[20px]">
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-primary bg-transparent rounded-lg border-[1px] border-primary appearance-none dark:text-primary focus:text-primary dark:border-primary dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer mx-auto"
                    placeholder=""
                    autoComplete="off"
                    value={values.username}
                    onChange={handleProfileChange}
                    onBlur={handleBlur}
                  />
                  <label
                    htmlFor="username"
                    className="absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                  >
                    Username
                  </label>
                </div>
                {(errors.username && touched.username) || updateUsernameError.type !== "" ? (
                  <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                    {errors.username || updateUsernameError.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
          <div className="inline-block mt-[35px]" onClick={updateUsernameSubmitHandler}>
            <SecondaryButton name="Update Username" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUsername;
