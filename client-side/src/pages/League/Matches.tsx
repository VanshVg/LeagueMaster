import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import LeagueNavbar from "../../components/League/LeagueNavbar";
import { IError, ILeagueMatches } from "../../types/types";
import { PrimaryButton } from "../../components/Buttons/Buttons";
import MatchCard from "../../components/League/Matches/MatchCard";

const Matches = () => {
  const [matchData, setMatchData] = useState<ILeagueMatches[]>();
  const [matchError, setMatchError] = useState<IError>({ type: "", message: "" });

  const leagueId = useParams().leagueId;

  const fetchLeague = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/matches/${leagueId}`, {
        withCredentials: true,
      });
      if (response.data.type === "success") {
        setMatchData(response.data.data);
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
  useEffect(() => {
    fetchLeague();
  }, []);

  const generateMatchesHandler = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/matches/${leagueId}/generate`,
        {},
        { withCredentials: true }
      );
      if (result.data.type === "success") {
        fetchLeague();
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setMatchError({ type: error.response?.data.type, message: error.response?.data.message });
      }
    }
  };

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
              {matchData && matchData.length > 0 ? (
                <div className="flex flex-wrap w-[90%] mx-auto">
                  {matchData.map((match) => {
                    return (
                      <div className="w-[calc(100%/2)] px-[20px]">
                        <MatchCard data={match} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <p className="text-red mt-[15px] text-[18px]">
                    Matches haven't been generated yet ...
                  </p>
                  <div className="inline-block mt-[10px]" onClick={generateMatchesHandler}>
                    <PrimaryButton name="Generate Matches" />
                    {matchError.type !== "" && <p className="text-red">{matchError.message}</p>}
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
