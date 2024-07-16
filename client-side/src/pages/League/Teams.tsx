import { Helmet } from "react-helmet";
import LeagueNavbar from "../../components/League/LeagueNavbar";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { ChangeEvent, useEffect, useState } from "react";
import { IError, IUserLeagues } from "../../types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons/Buttons";
import { FieldArray, FormikProvider, useFormik } from "formik";

const Teams = () => {
  const [leagueError, setLeagueError] = useState<IError>({ type: "", message: "" });
  const [leagueData, setLeagueData] = useState<IUserLeagues>();
  const [showAddTeams, setShowAddTeams] = useState<boolean>(false);

  const initialData = {
    teamName: [""],
  };

  const leagueId = useParams().leagueId;

  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/league/${leagueId}`,
          { withCredentials: true }
        );
        if (response.data.type === "success") {
          setLeagueData(response.data.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setLeagueError({
            type: error.response?.data.type,
            message: error.response?.data.message,
          });
        }
      }
    };
    fetchLeague();
  }, []);

  const formik = useFormik({
    initialValues: initialData,
    onSubmit: () => {},
  });

  const { values, handleChange } = formik;

  const inputChangeHandler = (e: ChangeEvent) => {
    handleChange(e);
  };

  const showAddTeamsHandler = (): void => {
    values.teamName = [""];
    setShowAddTeams(!showAddTeams);
  };

  return (
    <div className="h-screen font-ss3">
      <Helmet>
        <title>Teams</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] pb-[100px] overflow-y-auto">
            <LeagueNavbar active={"teams"} />
            <div>
              <h1 className="text-[35px] text-primary">Teams</h1>
              <div className="h-[1px] bg-secondary w-[80%] mx-auto"></div>
              {leagueData?.teams.length === 0 ? (
                <p className="text-red mt-[8px]">No teams have been Added in the league...</p>
              ) : (
                ""
              )}
              {leagueData?.league_matches.length === 0 && (
                <div>
                  <div
                    className="flex cursor-pointer w-[195px] mx-auto"
                    onClick={showAddTeamsHandler}
                  >
                    <h2 className="text-[30px] text-center ml-[20px] mt-[20px] font-bold text-primaryText">
                      Add Teams
                    </h2>
                    {showAddTeams ? (
                      <img src="/icons/down-arrow-dark.svg" className="mt-[25px]" alt="closed" />
                    ) : (
                      <img src="/icons/right-arrow-dark.svg" className="mt-[25px]" alt="opened" />
                    )}
                  </div>
                  {showAddTeams && (
                    <FormikProvider value={formik}>
                      <form>
                        <FieldArray
                          name="teamName"
                          render={(arrayHelpers) => {
                            return (
                              <div>
                                {values.teamName.map((team, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="flex justify-center gap-[20px] mt-[15px]"
                                    >
                                      <div>
                                        <input
                                          type="text"
                                          name={`teamName[${index}]`}
                                          value={formik.values.teamName[index]}
                                          onChange={inputChangeHandler}
                                          placeholder={`Team${index + 1} Name`}
                                          className="border-[1px] border-primary rounded-[3px] p-[5px]"
                                        />
                                      </div>
                                      <p
                                        className="mt-[5px] text-link hover:underline cursor-pointer"
                                        onClick={() => arrayHelpers.remove(index)}
                                      >
                                        Remove Field
                                      </p>
                                    </div>
                                  );
                                })}
                                <p
                                  className="mt-[15px] inline-block text-link hover:underline cursor-pointer"
                                  onClick={() => arrayHelpers.push("")}
                                >
                                  Add Field
                                </p>
                              </div>
                            );
                          }}
                        />
                      </form>
                    </FormikProvider>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
