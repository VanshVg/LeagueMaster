import { useState } from "react";
import UpdateUsername from "./UpdateUsername";
import UpdatePassword from "./UpdatePassword";

const Profile = () => {
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState<boolean>(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState<boolean>(false);

  const updateProfileHandler = (): void => {
    setIsUpdateProfileOpen(!isUpdateProfileOpen);
  };

  const changePasswordHandler = (): void => {
    setIsChangePasswordOpen(!isChangePasswordOpen);
  };
  return (
    <div className="ease-out duration-300">
      <div className="flex cursor-pointer w-[240px]" onClick={updateProfileHandler}>
        <h2 className="text-[23px] text-left ml-[20px] mt-[10px] font-bold text-primary underline">
          Update Username
        </h2>
        {isUpdateProfileOpen ? (
          <img src="/icons/down-arrow-blue.svg" className="mt-[10px]" alt="closed" />
        ) : (
          <img src="/icons/right-arrow-blue.svg" className="mt-[10px]" alt="opened" />
        )}
      </div>
      {isUpdateProfileOpen ? <UpdateUsername /> : ""}

      <div className="flex cursor-pointer w-[240px]" onClick={changePasswordHandler}>
        <h2 className="text-[23px] text-left ml-[20px] mt-[10px] font-bold text-primary underline">
          Change Password
        </h2>
        {isChangePasswordOpen ? (
          <img src="/icons/down-arrow-blue.svg" className="mt-[10px]" alt="closed" />
        ) : (
          <img src="/icons/right-arrow-blue.svg" className="mt-[10px]" alt="opened" />
        )}
      </div>
      {isChangePasswordOpen ? <UpdatePassword /> : ""}
    </div>
  );
};

export default Profile;
