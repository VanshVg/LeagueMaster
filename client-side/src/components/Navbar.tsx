import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/reducers/sidebarReducer";
import { useLocation, useNavigate } from "react-router-dom";
import CreateLeague from "./Modals/CreateLeague";
import { useState } from "react";
import JoinLeague from "./Modals/JoinLeague";

const Navbar = () => {
  const navbarDetails = {
    title: "League Master",
  };

  const [isCreateLeagueOpen, setIsCreateLeagueOpen] = useState<boolean>(false);
  const [isJoinLeagueOpen, setIsJoinLeagueOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.includes("auth") || location.pathname === "/") {
    return null;
  }

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const createLeagueHandler = (): void => {
    setIsCreateLeagueOpen(true);
  };

  const joinLeagueHandler = (): void => {
    setIsJoinLeagueOpen(true);
  };

  return (
    <div className="flex dashboard-navbar justify-between px-[30px] mx-auto shadow-[1px_1px_1px_1px_gray] py-[10px] pb-[15px] font-poppins">
      <div className="flex">
        <img
          src="/icons/menu.svg"
          alt="menu"
          className="h-[60px] duration-300 ease-out cursor-pointer hover:bg-lightBg rounded-[32px] p-[10px]"
          onClick={handleSidebar}
        />
        <img src="/icons/football.svg" alt="football" className="h-[45px] ml-[30px] mt-[8px]" />
        <h1
          className="text-primary font-semibold text-[35px] ml-[10px] mt-[5px] cursor-pointer font-ss3"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          {navbarDetails.title}
        </h1>
      </div>
      <div className="flex mt-[20px] gap-[20px]">
        <div
          className="flex duration-300 ease-out hover:bg-lightBg cursor-pointer rounded-[28px] pt-[5px] px-[10px]"
          onClick={createLeagueHandler}
        >
          <img src="/icons/plus.svg" alt="create" className="h-[30px]" />
          <p className="text-primary text-[18px] ml-[5px] mt-[2px]">Create League</p>
        </div>
        <div
          className="flex duration-300 ease-out hover:bg-lightBg cursor-pointer rounded-[28px] pt-[5px] px-[10px]"
          onClick={joinLeagueHandler}
        >
          <img src="/icons/door.svg" alt="join" className="h-[25px] mt-[5px]" />
          <p className="text-primary text-[18px] ml-[5px] mt-[3px]">Join League</p>
        </div>
        <div className="flex duration-300 ease-out hover:bg-lightBg cursor-pointer rounded-[28px] pt-[5px] px-[10px]">
          <img src="/icons/profile.svg" alt="profile" className="h-[25px] mt-[5px]" />
          <p className="text-primary text-[18px] ml-[5px] mt-[3px]">Profile</p>
        </div>
        <CreateLeague
          isOpen={isCreateLeagueOpen}
          onRequestClose={() => setIsCreateLeagueOpen(false)}
        />
        <JoinLeague isOpen={isJoinLeagueOpen} onRequestClose={() => setIsJoinLeagueOpen(false)} />
      </div>
    </div>
  );
};

export default Navbar;
