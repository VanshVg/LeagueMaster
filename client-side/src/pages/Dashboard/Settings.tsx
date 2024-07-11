import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Settings/Profile";
import axios from "axios";
import { IError } from "../../types";
import { useDispatch } from "react-redux";
import { setProfile } from "../../redux/reducers/userReducer";
import Account from "../../components/Settings/Account";

export interface IProfile {
  username: string;
}

const Settings = () => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(true);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(true);
  const [profileError, setProfileError] = useState<IError>({ type: "", message: "" });

  const profileHandler = (): void => {
    setIsProfileOpen(!isProfileOpen);
  };

  const accountHandler = (): void => {
    setIsAccountOpen(!isAccountOpen);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {
          withCredentials: true,
        });
        if (response.data.type === "success") {
          dispatch(setProfile(response.data.data));
        }
      } catch (error: any) {
        setProfileError({
          type: error.response.data.type,
          message: error.response.data.message,
        });
      }
    };
    fetchProfile();
  }, []);
  return (
    <div className="h-screen">
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <div className="settings-container h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] overflow-y-auto pb-[100px]">
            <div>
              <div className="flex cursor-pointer w-[145px]" onClick={profileHandler}>
                <h2 className="text-[30px] text-left ml-[20px] mt-[20px] font-bold text-primaryText underline">
                  Profile
                </h2>
                {isProfileOpen ? (
                  <img src="/icons/down-arrow-dark.svg" className="mt-[20px]" alt="closed" />
                ) : (
                  <img src="/icons/right-arrow-dark.svg" className="mt-[20px]" alt="opened" />
                )}
              </div>
              {isProfileOpen && <Profile />}
            </div>
            <div>
              <div className="flex cursor-pointer w-[145px]" onClick={accountHandler}>
                <h2 className="text-[30px] text-left ml-[20px] mt-[20px] font-bold text-primaryText underline">
                  Account
                </h2>
                {isAccountOpen ? (
                  <img src="/icons/down-arrow-dark.svg" className="mt-[20px]" alt="closed" />
                ) : (
                  <img src="/icons/right-arrow-dark.svg" className="mt-[20px]" alt="opened" />
                )}
              </div>
              {isAccountOpen && <Account />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
