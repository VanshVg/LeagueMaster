import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import LeagueNavbar from "../../components/League/LeagueNavbar";
import { useEffect, useState } from "react";
import { IApiResponse, IUserLeagues } from "../../types/types";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import UpdateLeague from "../../components/League/About/UpdateLeague";

const About = () => {
  const [leagueData, setLeagueData] = useState<IUserLeagues>();

  const leagueId = useParams().leagueId;
  const { callApi } = useAxios();

  const fetchLeague = async () => {
    const result: IApiResponse = await callApi({
      url: `/league/${leagueId}`,
      method: "GET",
      data: {},
      params: {},
    });
    if (result.type === "success") {
      setLeagueData(result.data as IUserLeagues);
    }
  };

  useEffect(() => {
    fetchLeague();
  }, []);

  return (
    <div className="h-screen font-ss3">
      <Helmet>
        <title>About</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] pb-[100px] overflow-y-auto">
            <LeagueNavbar active={"about"} />
            <h1 className="text-[35px] text-primary">About</h1>
            <div className="h-[1px] bg-secondary w-[80%] mx-auto" />
            <UpdateLeague leagueData={leagueData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
