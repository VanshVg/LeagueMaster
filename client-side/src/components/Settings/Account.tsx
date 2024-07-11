import { useState } from "react";
import DeleteAccount from "./DeleteAccount";

const Account = () => {
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState<boolean>(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState<boolean>(false);

  const deleteAccountHandler = (): void => {
    setIsDeleteAccountOpen(!isDeleteAccountOpen);
  };

  const changePasswordHandler = (): void => {
    setIsChangePasswordOpen(!isChangePasswordOpen);
  };

  return (
    <div className="ease-out duration-300">
      <div className="flex cursor-pointer w-[240px]" onClick={deleteAccountHandler}>
        <h2 className="text-[23px] text-left ml-[20px] mt-[10px] font-bold text-primary underline">
          Delete Account
        </h2>
        {isDeleteAccountOpen ? (
          <img src="/icons/down-arrow-blue.svg" className="mt-[10px]" alt="closed" />
        ) : (
          <img src="/icons/right-arrow-blue.svg" className="mt-[10px]" alt="opened" />
        )}
      </div>
      {isDeleteAccountOpen ? <DeleteAccount /> : ""}

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
      {isChangePasswordOpen ? <DeleteAccount /> : ""}
    </div>
  );
};

export default Account;
