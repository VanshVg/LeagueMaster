import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { IError, IModalProps } from "../../types/types";
import { SecondaryButton } from "../Buttons/Buttons";
import { useDispatch } from "react-redux";
import { addUserLeague } from "../../redux/reducers/leaguesReducer";
import joinLeagueSchema from "../../schema/joinLeagueSchema";

const JoinLeague = ({ isOpen, onRequestClose }: IModalProps) => {
  const initialData = {
    leagueCode: "",
  };

  const [joinLeagueError, setJoinLeagueError] = useState<IError>({ type: "", message: "" });

  const dispatch = useDispatch();

  const { errors, values, touched, handleBlur, handleChange, submitForm, resetForm, setErrors } =
    useFormik({
      initialValues: initialData,
      validationSchema: joinLeagueSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/league/join`,
            values,
            {
              withCredentials: true,
            }
          );
          if (response.data.type === "success") {
            dispatch(addUserLeague(response.data.data));
            resetForm();
            onRequestClose();
          }
        } catch (error: any) {
          setJoinLeagueError({
            type: error.response.data.type,
            message: error.response.data.message,
          });
        }
      },
    });

  const exitHandler = (): void => {
    setJoinLeagueError({ type: "", message: "" });
    setErrors({});
    resetForm();
    onRequestClose();
  };

  const handleInputChange = (e: ChangeEvent): void => {
    setJoinLeagueError({ type: "", message: "" });
    handleChange(e);
  };

  const submitHandler = () => {
    submitForm();
  };

  return (
    <div className="font-poppins">
      <Modal
        isOpen={isOpen}
        onRequestClose={exitHandler}
        contentLabel="Join a League"
        ariaHideApp={false}
        className={
          "w-[50%] bg-white border-0 outline-0 mx-auto mt-[170px] shadow-[2px_2px_2px_2px_grey] rounded-[8px] pb-[30px] pt-[15px] px-[20px] font-ss3"
        }
      >
        <img
          src="/icons/close.svg"
          className="flex ml-auto cursor-pointer"
          onClick={exitHandler}
          alt=""
        ></img>
        <form>
          <h1 className="text-primary text-center text-[30px] font-poppins font-semibold">
            Join a League
          </h1>
          <div className="flex mx-auto max-w-[77%] gap-[6%] mt-[20px]"></div>
          <div className="mt-[20px] max-w-[77%] mx-auto">
            <div className="relative">
              <input
                tabIndex={1}
                type="text"
                id="league-code"
                name="leagueCode"
                className="block  px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-primary bg-transparent rounded-lg border-[1px] border-primary appearance-none dark:text-primary focus:text-primary dark:border-primary dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer mx-auto z-10"
                placeholder=""
                autoComplete="off"
                value={values.leagueCode}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="league-name"
                className="absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
              >
                Team Code
              </label>
            </div>
            {(errors.leagueCode && touched.leagueCode) || joinLeagueError.type !== "" ? (
              <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">
                {errors.leagueCode || joinLeagueError.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-[40px] max-w-[77%] mx-auto flex justify-center">
            <div onClick={submitHandler} className="inline-block">
              <SecondaryButton name="Join a League" />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default JoinLeague;
