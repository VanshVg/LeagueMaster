import { Helmet } from "react-helmet";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import LeagueNavbar from "../../components/League/LeagueNavbar";
import { useEffect, useState } from "react";
import { IError, IUserLeagues } from "../../types/types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PrimaryButton } from "../../components/Buttons/Buttons";

const Matches = () => {
  const [leagueData, setLeagueData] = useState<IUserLeagues>();
  const [matchError, setMatchError] = useState<IError>({ type: "", message: "" });

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
          setMatchError({
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
        <title>Matches</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] pb-[100px] overflow-y-auto">
            <LeagueNavbar active={"matches"} />
            <div>
              <h1 className="text-[35px] text-primary">Matches</h1>
              <div className="h-[1px] bg-secondary w-[80%] mx-auto" />
              {leagueData && leagueData.league_matches.length > 0 ? (
                ""
              ) : (
                <div>
                  <p className="text-red mt-[15px] text-[18px]">
                    Matches haven't been generated yet ...
                  </p>
                  <div className="inline-block mt-[10px]">
                    <PrimaryButton name="Generate Matches" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
