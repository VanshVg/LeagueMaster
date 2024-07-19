import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import LeagueNavbar from "../../components/League/LeagueNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IError, IUserLeagues } from "../../types/types";

import LeagueDetails from "../../components/League/LeagueDetails";
import RecentMatches from "../../components/League/RecentMatches";
import UpcomingMatches from "../../components/League/UpcomingMatches";
import { PrimaryButton } from "../../components/Buttons/Buttons";

const League = () => {
  const leagueId = useParams().leagueId;

  const [leagueError, setLeagueError] = useState<IError>({ type: "", message: "" });
  const [leagueData, setLeagueData] = useState<IUserLeagues>();

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

  return (
    <div className="h-screen font-ss3">
      <Helmet>
        <title>League</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          {leagueError.type !== "" ? (
            <p>Something went wrong!</p>
          ) : (
            <div className="w-[93%] pb-[100px] overflow-y-auto">
              <LeagueNavbar active={"league"} />
              <div className="w-[90%] mx-auto">
                <h1 className="text-primary font-poppins text-[50px]">{leagueData?.name}</h1>
                <div className="h-[1px] bg-secondary mt-[10px]"></div>
                {leagueData?.teams && leagueData?.teams.length < 5 ? (
                  <div className=" mt-[25px]">
                    <p className="text-red">No teams have been added in the league...</p>
                    <div className="inline-block mt-[10px]">
                      <PrimaryButton name="Add teams" />
                    </div>
                  </div>
                ) : (
                  <div>
                    {leagueData?.league_matches.length === 0 ? (
                      <div className=" mt-[25px]">
                        <p className="text-red">Matches haven't been generated yet...</p>
                      </div>
                    ) : (
                      <div className="flex mt-[15px] gap-[10px]">
                        <div className="w-[50%] border-[1px] pt-[5px] pb-[20px] border-primaryText border-opacity-40 rounded-[5px]">
                          <h2 className="text-[35px] text-primaryText">Recent Matches</h2>
                          <RecentMatches leagueMatches={leagueData?.league_matches} />
                        </div>
                        <div className="w-[50%] border-[1px] pt-[5px] pb-[20px] border-primaryText border-opacity-40 rounded-[5px]">
                          <h2 className="text-[35px]">Upcoming Matches</h2>
                          <UpcomingMatches leagueMatches={leagueData?.league_matches} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default League;
