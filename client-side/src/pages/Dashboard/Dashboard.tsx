import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { IError, IUserLeagues } from "../../types/types";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LeagueCard from "../../components/Dashboard/LeagueCard";
import { PrimaryButton } from "../../components/Buttons/Buttons";
import CreateLeague from "../../components/Modals/CreateLeague";

const Dashboard = () => {
  const [userLeagues, setUserLeagues] = useState<IUserLeagues[]>();
  const [userLeaguesError, setUserLeaguesError] = useState<IError>({ type: "", message: "" });
  const [isCreateLeagueOpen, setIsCreateLeagueOpen] = useState<boolean>(false);

  const dashboardDiv = useRef(null);

  const newUserLeagues = useSelector((state: RootState) => state.userLeagues);

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
    (dashboardDiv.current! as HTMLElement).scrollTop = (
      dashboardDiv.current! as HTMLElement
    ).scrollHeight;
  }, [newUserLeagues]);

  const createLeagueHandler = (): void => {
    setIsCreateLeagueOpen(true);
  };

  return (
    <div className="h-screen font-ss3">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          {userLeaguesError.type !== "" ? (
            <p className="text-red mt-[10px]">{userLeaguesError.message}</p>
          ) : (
            <div className="w-[93%] mx-auto p-[20px] overflow-y-auto pb-[100px]" ref={dashboardDiv}>
              {userLeagues && userLeagues.length > 0 ? (
                <div className="flex flex-wrap mt-[10px]">
                  {userLeagues &&
                    userLeagues.map((element: IUserLeagues, index: number) => {
                      return <LeagueCard league={element} key={index} />;
                    })}
                </div>
              ) : (
                <div>
                  <img
                    src="/images/addLeague_bg.png"
                    className="mx-auto -mt-[70px]"
                    alt="addLeagues"
                  />
                  <div className="text-[18px] inline-block" onClick={createLeagueHandler}>
                    <PrimaryButton name="Create a League" />
                  </div>
                  <CreateLeague
                    isOpen={isCreateLeagueOpen}
                    onRequestClose={() => setIsCreateLeagueOpen(false)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
