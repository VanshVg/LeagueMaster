import { FieldArray, FormikProvider, useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import { PrimaryButton } from "../../Buttons/Buttons";
import { IError } from "../../../types/types";
import axios from "axios";
import { useParams } from "react-router-dom";

type IAddTeamsProps = {
  setNewTeams: () => void;
};

const AddTeams = ({ setNewTeams }: IAddTeamsProps) => {
  const initialData = {
    teamName: [""],
  };

  const [addTeamsError, setAddTeamsError] = useState<IError>({ type: "", message: "" });

  const leagueId = useParams().leagueId;

  const formik = useFormik({
    initialValues: initialData,
    onSubmit: async (values) => {
      let updatedData: string[] = values.teamName.filter((team) => team !== "");
      if (updatedData.length === 0) {
        setAddTeamsError({ type: "empty", message: "At least one team name must be entered." });
        return;
      }
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/league/teams/${leagueId}`,
          { teams: updatedData },
          { withCredentials: true }
        );
        if (response.data.type === "success") {
          setNewTeams();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setAddTeamsError({
            type: error.response?.data.type,
            message: error.response?.data.message,
          });
        }
      }
    },
  });

  const { values, handleChange, submitForm } = formik;

  const inputChangeHandler = (e: ChangeEvent) => {
    setAddTeamsError({ type: "", message: "" });
    handleChange(e);
  };

  const addTeamsHandler = () => {
    submitForm();
  };

  return (
    <FormikProvider value={formik}>
      <div className="inline-block mt-[10px]" onClick={addTeamsHandler}>
        <PrimaryButton name="Add Teams" />
      </div>
      {addTeamsError.type !== "" && <p className="text-red text-center">{addTeamsError.message}</p>}
      <form>
        <FieldArray
          name="teamName"
          render={(arrayHelpers) => {
            return (
              <div>
                <div>
                  <p
                    className="mt-[15px] inline-block text-link hover:underline cursor-pointer"
                    onClick={() => arrayHelpers.push("")}
                  >
                    Add Field
                  </p>
                </div>
                <div className="flex flex-wrap">
                  {values.teamName.map((team, index) => {
                    return (
                      <div className="p-[10px] mx-auto w-[calc(100%/4)]" key={index}>
                        <div key={index} className="mt-[15px]">
                          <div>
                            <input
                              type="text"
                              name={`teamName[${index}]`}
                              value={formik.values.teamName[index]}
                              onChange={inputChangeHandler}
                              placeholder={`Team ${index + 1} Name`}
                              className="border-[1px] border-primary rounded-[3px] p-[5px] outline-none text-primary"
                            />
                          </div>
                          <p
                            className="mt-[5px] text-link hover:underline cursor-pointer w-full"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove Field
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }}
        />
      </form>
    </FormikProvider>
  );
};

export default AddTeams;
