import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { IError, IUserLeagues } from "../../types";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IMatchTypes {
  [x: number]: string;
}

const types: IMatchTypes = {
  1: "League",
  2: "Knockouts",
  3: "League+Knockouts",
  4: "Groups+Knockouts",
};

const Dashboard = () => {
  const [userLeagues, setUserLeagues] = useState<IUserLeagues[]>();
  const [userLeaguesError, setUserLeaguesError] = useState<IError>({ type: "", message: "" });

  const newUserLeagues = useSelector((state: RootState) => state.userLeagues.userLeagues);

  const fetchUserLeagues = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/league/leagues`, {
        withCredentials: true,
      });
      if (response.data.type === "success") {
        setUserLeagues(response.data.data);
      }
    } catch (error: any) {
      setUserLeaguesError({ type: error.response.data.type, message: error.response.data.message });
    }
  };

  useEffect(() => {
    fetchUserLeagues();
  }, [newUserLeagues]);
  console.log(userLeagues);
  return (
    <div className="h-screen font-poppins">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] mx-auto p-[20px] overflow-y-auto">
            <div className="flex flex-wrap mt-[10px]">
              {userLeagues &&
                userLeagues.map((element: IUserLeagues, index: number) => {
                  return (
                    <div className="w-[calc(100%/2)] p-[20px]">
                      <div className="border-[1px] border-[gray] rounded-[4px] hover:scale-110 duration-300 ease-in cursor-pointer hover:border-primary p-[10px]">
                        <div>
                          <h1 className="text-center text-primary font-semibold text-[25px] font-ss3">
                            {element.name}
                          </h1>
                        </div>
                        <p className="text-[gray] mt-[10px]">
                          {types[element.type_id as keyof IMatchTypes]} Format
                        </p>
                        <div className="h-[1px] bg-secondary mt-[10px] max-w-[80%] mx-auto"></div>
                        <div className="flex justify-between mx-auto text-primaryText mt-[15px] max-w-[80%] text-[15px]">
                          <p>Total Teams: {element.teams.length}</p>
                          <p>Total Matches: {element.league_matches.length}</p>
                        </div>
                      </div>
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

export default Dashboard;
