import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import leagueSchema from "../../schema/leagueSchema";
import axios from "axios";
import { IError } from "../../types/types";
import { SecondaryButton } from "../Buttons/Buttons";
import { useDispatch } from "react-redux";
import { setUserLeagues } from "../../redux/reducers/leaguesReducer";

type IModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

type ILeagueTypes = {
  id: number;
  type: string;
};

const CreateLeague = ({ isOpen, onRequestClose }: IModalProps) => {
  const initialData = {
    leagueName: "",
    type: "",
  };

  const [createLeagueError, setCreateLeagueError] = useState<IError>({ type: "", message: "" });
  const [leagueTypes, setLeagueTypes] = useState<ILeagueTypes[]>();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllTypes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/league/types`, {
          withCredentials: true,
        });
        if (response.data.type === "success") {
          setLeagueTypes(response.data.data);
        }
      } catch (error: any) {
        setCreateLeagueError({ type: error.response.data.type, message: error.response.data.type });
      }
    };
    fetchAllTypes();
  }, []);

  const { errors, values, touched, handleBlur, handleChange, submitForm, resetForm, setErrors } =
    useFormik({
      initialValues: initialData,
      validationSchema: leagueSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/league/create`,
            values,
            {
              withCredentials: true,
            }
          );
          if (response.data.type === "success") {
            dispatch(setUserLeagues(response.data.data));
            resetForm();
            onRequestClose();
          }
        } catch (error: any) {
          setCreateLeagueError({
            type: error.response.data.type,
            message: error.response.data.message,
          });
        }
      },
    });

  const exitHandler = (): void => {
    setCreateLeagueError({ type: "", message: "" });
    setErrors({});
    resetForm();
    onRequestClose();
  };

  const handleInputChange = (e: ChangeEvent): void => {
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
        contentLabel="Create a League"
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
            Create a League
          </h1>
          <div className="flex mx-auto max-w-[77%] gap-[6%] mt-[20px]"></div>
          <div className="mt-[20px] max-w-[77%] mx-auto">
            <div className="relative">
              <input
                tabIndex={1}
                type="text"
                id="league-name"
                name="leagueName"
                className="block  px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-primary bg-transparent rounded-lg border-[1px] border-primary appearance-none dark:text-primary focus:text-primary dark:border-primary dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer mx-auto z-10"
                placeholder=""
                autoComplete="off"
                value={values.leagueName}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="league-name"
                className="absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
              >
                Team Name
              </label>
            </div>
            {errors.leagueName && touched.leagueName ? (
              <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">
                {errors.leagueName}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-[20px] max-w-[77%] mx-auto">
            <div className="relative">
              <div className="flex">
                <select
                  tabIndex={1}
                  id="league-type"
                  name="type"
                  className="block  px-2.5 pb-[5px] pt-2 w-full h-[40px] text-sm text-primary bg-transparent rounded-lg border-[1px] border-primary appearance-none dark:text-primary focus:text-primary dark:border-primary dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer mx-auto cursor-pointer text-[18px]"
                  autoComplete="off"
                  value={values.type}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled hidden>
                    Select League Type
                  </option>
                  {leagueTypes &&
                    leagueTypes.map((element: ILeagueTypes, index: number) => {
                      return (
                        <option className="text-primaryText" value={element.id} key={index}>
                          {element.type}
                        </option>
                      );
                    })}
                </select>
                <img src="/icons/down-arrow.svg" alt="right" className="-ml-[25px] " />
              </div>
              <label
                htmlFor="league-type"
                className="absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto text-[18px]"
              >
                League Type
              </label>
            </div>
            {errors.type && touched.type ? (
              <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">{errors.type}</p>
            ) : (
              ""
            )}
            {createLeagueError.type !== "" ? (
              <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">
                {createLeagueError.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mt-[40px] max-w-[77%] mx-auto flex justify-center">
            <div onClick={submitHandler} className="inline-block">
              <SecondaryButton name="Create a League" />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateLeague;
