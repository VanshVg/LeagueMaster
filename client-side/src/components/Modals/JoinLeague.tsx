import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { IError, IModalProps } from "../../types/types";
import { SecondaryButton } from "../Buttons/Buttons";
import { useDispatch } from "react-redux";
import { addUserLeague } from "../../redux/reducers/leaguesReducer";
import joinLeagueSchema from "../../schema/joinLeagueSchema";
import Input from "../Form/Input";

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
            <Input
              type="text"
              id="leagueCode"
              value={values.leagueCode}
              onChange={handleInputChange}
              onBlur={handleBlur}
              label="League Code"
              errors={errors.leagueCode}
              touched={touched.leagueCode}
            />
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
