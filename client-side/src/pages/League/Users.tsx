import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import LeagueNavbar from "../../components/League/LeagueNavbar";
import Admin from "../../components/League/Users/Admin";
import { useEffect, useState } from "react";
import { IApiResponse, IUserLeagues } from "../../types/types";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import Members from "../../components/League/Users/Members";

const Users = () => {
  const [userData, setUserData] = useState<IUserLeagues>();

  const leagueId = useParams().leagueId;
  const { callApi } = useAxios();

  const fetchData = async () => {
    const result: IApiResponse = await callApi({
      url: `/league/${leagueId}/users`,
      method: "GET",
      data: {},
      params: {},
    });
    if (result.type === "success") {
      setUserData(result.data as IUserLeagues);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-screen font-ss3">
      <Helmet>
        <title>Users</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] pb-[100px] overflow-y-auto">
            <LeagueNavbar active={"users"} />
            <div>
              <h1 className="text-[35px] text-primary text-left max-w-[80%] mx-auto font-ss3">
                Admins
              </h1>
              <div className="h-[1px] bg-secondary w-[80%] mx-auto" />
              <Admin userData={userData} />
            </div>
            <div>
              <h1 className="text-[35px] text-primary mt-[50px] text-left max-w-[80%] mx-auto font-ss3">
                Members
              </h1>
              <div className="h-[1px] bg-secondary w-[80%] mx-auto" />
              <Members userData={userData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
