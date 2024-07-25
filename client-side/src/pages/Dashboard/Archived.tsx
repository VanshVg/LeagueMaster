import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { IApiResponse, ILeagues, IUserLeagues } from "../../types/types";
import useAxios from "../../hooks/useAxios";
import ArchivedLeagueCard from "../../components/Archived/ArchivedLeagueCard";
import { Link } from "react-router-dom";

const Archived = () => {
  const [archivedLeagues, setArchivedLeagues] = useState<IUserLeagues[]>();

  const { callApi } = useAxios();

  const fetchData = async () => {
    const result: IApiResponse = await callApi({
      url: `/league/archived`,
      method: "GET",
      data: {},
      params: {},
    });
    if (result.type === "success") {
      setArchivedLeagues(result.data as IUserLeagues[]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="h-screen font-ss3">
      <Helmet>
        <title>Archived Leagues</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] mx-auto p-[20px] overflow-y-auto pb-[100px]">
            <h1 className="text-[35px] text-primary">Archived Leagues</h1>
            <div className="h-[1px] bg-secondary w-[80%] mx-auto" />
            <div className="flex flex-wrap">
              {archivedLeagues &&
                archivedLeagues.map((league, index) => {
                  return (
                    <div className="p-[10px] w-[calc(100%/3)]" key={index}>
                      <Link to={`/league/${league.id}`}>
                        <ArchivedLeagueCard data={league} />
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archived;
