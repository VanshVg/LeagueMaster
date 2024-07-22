import Modal from "react-modal";
import { IError, ILeagueMatches } from "../../types/types";
import { ChangeEvent, useRef, useState } from "react";
import { SecondaryButton } from "../Buttons/Buttons";
import { useFormik } from "formik";
import updateResultSchema from "../../schema/updateResultSchema";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

type IUpdateResultProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  data: ILeagueMatches;
};

const UpdateResult = ({ isOpen, onRequestClose, data }: IUpdateResultProps) => {
  const initialData = {
    home_team_score: "",
    away_team_score: "",
    home_team_penalty: "",
    away_team_penalty: "",
  };

  const [extraTime, setExtraTime] = useState<boolean>(false);
  const [penalties, setPenalties] = useState<boolean>(false);
  const [updateResultError, setUpdateResultError] = useState<IError>({ type: "", message: "" });

  const exitHandler = () => {
    resetForm();
    setUpdateResultError({ type: "", message: "" });
    onRequestClose();
  };

  const extraTimeField = useRef<HTMLInputElement>(null);
  const penaltyField = useRef<HTMLInputElement>(null);
  const leagueId = useParams().leagueId;

  const extraTimeHandler = () => {
    if (extraTime) {
      setPenalties(false);
      if (penaltyField.current) {
        penaltyField.current.checked = false;
      }
    }
    setExtraTime(!extraTime);
  };

  const penaltiesHandler = () => {
    if (!penalties) {
      setExtraTime(true);
      if (extraTimeField.current) {
        extraTimeField.current.checked = true;
      }
    }
    setPenalties(!penalties);
  };

  const { errors, values, handleBlur, handleChange, submitForm, resetForm } = useFormik({
    initialValues: initialData,
    validationSchema: updateResultSchema,
    onSubmit: async (values) => {
      if (penalties) {
        if (
          values.home_team_penalty === "" ||
          values.away_team_penalty === "" ||
          isNaN(Number(values.home_team_penalty)) ||
          isNaN(Number(values.away_team_penalty))
        ) {
          setUpdateResultError({ type: "penalty", message: "Please enter correct penalty score" });
          return;
        }
      }
      const finalData = {
        home_team_score: values.home_team_score,
        away_team_score: values.away_team_score,
        home_team_penalty: values.home_team_penalty,
        away_team_penalty: values.away_team_penalty,
        extra_time: extraTime,
        penalties: penalties,
      };
      try {
        const result = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/matches/${leagueId}/${data.id}/result`,
          finalData,
          { withCredentials: true }
        );
        if (result.data.type === "success") {
          Swal.fire({
            title: "Update Successful",
            text: "Updated result successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            exitHandler();
          });
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setUpdateResultError({
            type: error.response?.data.type,
            message: error.response?.data.message,
          });
        }
      }
    },
  });

  const inputChangeHandler = (e: ChangeEvent) => {
    setUpdateResultError({ type: "", message: "" });
    handleChange(e);
  };

  const submitHandler = () => {
    submitForm();
  };

  return (
    <div>
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
        />
        <form className="text-center">
          <h1 className="text-primary text-center text-[30px] font-poppins font-semibold">
            Update Result
          </h1>
          <div className="flex mx-auto max-w-[77%] gap-[6%]  mt-[20px]"></div>
          <p className="text-center text-[23px] text-primaryText">{extraTime ? "120'" : "90'"}</p>
          <div className="flex justify-center gap-[20px]">
            <div className="flex w-[45%] gap-[10px] justify-end">
              <h2 className="text-primary text-[23px]">{data.home_team.team_name}</h2>
              <input
                type="text"
                className="border-b-[1px] w-[30px] outline-none text-[25px] text-secondary text-center border-primaryText"
                name="home_team_score"
                value={values.home_team_score}
                onBlur={handleBlur}
                onChange={inputChangeHandler}
                autoFocus
              />
            </div>
            <p className="text-[25px] text-secondary">:</p>
            <div className="flex w-[45%] gap-[10px]">
              <input
                type="text"
                className="border-b-[1px] w-[30px] outline-none text-[25px] text-secondary text-center border-primaryText"
                name="away_team_score"
                value={values.away_team_score}
                onBlur={handleBlur}
                onChange={inputChangeHandler}
              />
              <h2 className="text-primary text-[23px]">{data.away_team.team_name}</h2>
            </div>
          </div>

          {penalties && (
            <div>
              <div className="flex justify-center gap-[20px] mt-[15px]">
                <input
                  type="text"
                  className="border-b-[1px] w-[30px] outline-none text-[25px] text-secondary text-center border-primaryText"
                  name="home_team_penalty"
                  value={values.home_team_penalty}
                  onBlur={handleBlur}
                  onChange={inputChangeHandler}
                  autoFocus
                />
                <p className="text-[25px] text-secondary">Penalties</p>
                <input
                  type="text"
                  className="border-b-[1px] w-[30px] outline-none text-[25px] text-secondary text-center border-primaryText"
                  name="away_team_penalty"
                  value={values.away_team_penalty}
                  onBlur={handleBlur}
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
          )}
          {data.match_type_id !== 1 && (
            <div className="mt-[40px]">
              <div className="flex justify-center gap-[10px]">
                <input
                  type="checkbox"
                  name="extraTime"
                  onChange={extraTimeHandler}
                  ref={extraTimeField}
                />
                <label className="text-primaryText text-[20px]">Extra Time?</label>
              </div>
              <div className="flex justify-center gap-[10px] mt-[10px]">
                <input
                  type="checkbox"
                  name="penalty"
                  onChange={penaltiesHandler}
                  ref={penaltyField}
                />
                <label className="text-primaryText text-[20px]">Penalties?</label>
              </div>
            </div>
          )}
          <div className="mt-[35px] mb-[15px]  text-red">
            {errors.home_team_score ||
              errors.away_team_score ||
              (updateResultError.type !== "" && (
                <p className="-mb-[12px] mt-[2px] text-red">
                  {errors.home_team_score || errors.away_team_score || updateResultError.message}
                </p>
              ))}
          </div>
          <div className="inline-block" onClick={submitHandler}>
            <SecondaryButton name="Update Result" />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateResult;
