import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { toggleLeagues } from "../redux/reducers/sidebarReducer";
import LeagueSidebarListing from "./League/LeagueSidebarListing";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import { IApiResponse, IError, IUserLeagues } from "../types/types";
import axios from "axios";
import { setUserLeagues } from "../redux/reducers/leaguesReducer";
import { logout } from "../redux/reducers/authReducer";

const Sidebar = () => {
  const isSidebarOpen: boolean = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
  const isLeagueOpen: boolean = useSelector((state: RootState) => state.sidebar.isLeagueOpen);
  const [leagues, setLeagues] = useState<IUserLeagues[]>();
  const [userLeaguesError, setUserLeaguesError] = useState<IError>({ type: "", message: "" });

  const userLeagues: IUserLeagues[] = useSelector(
    (state: RootState) => state.userLeagues.userLeagues
  );

  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { callApi } = useAxios();

  const fetchUserLeagues = async () => {
    try {
      const response: IApiResponse = await callApi({
        url: `/league/leagues`,
        method: "GET",
        data: {},
        params: {},
      });
      if (response.type === "success") {
        dispatch(setUserLeagues(response.data));
        setLeagues(response.data as IUserLeagues[]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setUserLeaguesError({
          type: error?.response?.data.type,
          message: error?.response?.data.message,
        });
      }
    }
  };

  useEffect(() => {
    if (userLeagues.length === 0) {
      fetchUserLeagues();
    } else {
      setLeagues(userLeagues);
    }
  }, [userLeagues]);

  const logoutHandler = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are sure you want to logout?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      confirmButtonColor: "#2554c7",
      color: "#28183b",
      showLoaderOnConfirm: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(logout());
          Swal.fire({
            title: "Logout Successful",
            text: "Logout Successful",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate("/");
          });
        }
      })
      .catch(() => {
        navigate("/*");
      });
  };

  const leagueHandler = () => {
    dispatch(toggleLeagues());
  };

  return (
    <>
      {isSidebarOpen ? (
        <div className="h-screen duration-300 ease-in shadow-[1px_1px_1px_1px_gray] w-[23%] pt-[15px] pb-[110px] overflow-y-auto font-poppins">
          <Link to={"/dashboard"}>
            <div
              className={`${
                location.pathname === "/dashboard"
                  ? "mt-[5px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                  : "mt-[5px] rounded-[12px] duration-300 ease-out -ml-[10px] py-[2px] cursor-pointer flex hover:bg-lightBg max-w-[95%]"
              }`}
            >
              <img src="/icons/home.svg" className="ml-[45px]" alt="" />
              <p className="ml-[15px] text-[18px] text-primaryText">Home</p>
            </div>
          </Link>
          <div className="h-[1px] bg-[grey] mt-[15px] opacity-50 w-full"></div>
          <div
            className="mt-[15px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
            onClick={leagueHandler}
          >
            <img src="/icons/medal.svg" className="ml-[42px] h-[30px]" alt="leagues" />
            <p className="ml-[13px] mt-[3px] text-[18px] text-primaryText">Leagues</p>
            {isLeagueOpen ? (
              <img src="/icons/down-arrow-blue.svg" alt="" className="ml-[20px] mt-[5px]" />
            ) : (
              <img src="/icons/right-arrow-blue.svg" alt="" className="ml-[20px] mt-[5px]" />
            )}
          </div>
          {isLeagueOpen && (
            <div>
              <LeagueSidebarListing userLeagues={leagues} />
            </div>
          )}
          <div className="h-[1px] bg-[grey] mt-[15px] opacity-50 w-full"></div>
          <Link to={"/archived"}>
            <div
              className={`${
                location.pathname === "/archived"
                  ? "mt-[15px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                  : "mt-[15px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
              }`}
            >
              <img src="/icons/archived.svg" className="ml-[45px]" alt="archived" />
              <p className="ml-[15px] text-[18px] text-primaryText">
                <span className="mr-[5px]">Archived</span>Leagues
              </p>
            </div>
          </Link>
          <Link to={"/settings"}>
            <div
              className={`${
                location.pathname === "/settings"
                  ? "mt-[15px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                  : "mt-[15px] rounded-[12px] duration-300 ease-out -ml-[10px] py-[2px] cursor-pointer flex hover:bg-lightBg max-w-[95%]"
              }`}
            >
              <img src="/icons/settings.svg" className="ml-[45px]" alt="" />
              <p className="ml-[15px] text-[18px] text-primaryText">Settings</p>
            </div>
          </Link>
          <div
            className="mt-[15px] rounded-[12px] -ml-[10px] py-[2px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
            onClick={logoutHandler}
          >
            <img src="/icons/exit.svg" className="ml-[45px]" alt="" />
            <p className="ml-[15px] text-[18px] text-primaryText">Logout</p>
          </div>
        </div>
      ) : (
        <div className="h-screen duration-300 ease-in shadow-[1px_1px_1px_1px_gray] w-[7%] pt-[15px] overflow-y-auto font-poppins">
          <Link to={"/dashboard"}>
            <Tooltip title="Home">
              <div
                className={`${
                  location.pathname === "/dashboard"
                    ? "mt-[4px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                    : "mt-[4px] rounded-[12px] duration-300 ease-out -ml-[10px] py-[4px] cursor-pointer flex hover:bg-lightBg max-w-[95%]"
                }`}
              >
                <img src="/icons/home.svg" className="ml-[45px]" alt="" />
                <p className="ml-[15px] text-[18px] text-primaryText hidden">Home</p>
              </div>
            </Tooltip>
          </Link>
          <div className="h-[1px] bg-[grey] mt-[14px] opacity-50 w-full"></div>
          <Tooltip title="Leagues">
            <div
              className="mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
              onClick={leagueHandler}
            >
              <img src="/icons/medal.svg" className="ml-[42px] h-[30px]" alt="leagues" />
            </div>
          </Tooltip>
          <div className="h-[1px] bg-[grey] mt-[14px] opacity-50 w-full"></div>
          <Link to={"/archived"}>
            <Tooltip title="Archived Leagues">
              <div
                className={`${
                  location.pathname === "/archived"
                    ? "mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                    : "mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
                }`}
              >
                <img src="/icons/archived.svg" className="ml-[45px]" alt="archived" />
              </div>
            </Tooltip>
          </Link>
          <Link to={"/settings"}>
            <Tooltip title="Settings">
              <div
                className={`${
                  location.pathname === "/settings"
                    ? "mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex max-w-[95%] bg-skyBlue"
                    : "mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
                }`}
              >
                <img src="/icons/settings.svg" className="ml-[45px]" alt="settings" />
              </div>
            </Tooltip>
          </Link>
          <Tooltip title="Logout">
            <div
              className="mt-[14px] rounded-[12px] -ml-[10px] py-[4px] cursor-pointer flex duration-300 ease-out hover:bg-lightBg max-w-[95%]"
              onClick={logoutHandler}
            >
              <img src="/icons/exit.svg" className="ml-[45px]" alt="exit" />
            </div>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default Sidebar;
