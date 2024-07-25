import { useEffect, useState } from "react";
import { ILeagueUsers, IUsersProps } from "../../../types/types";

const Members = ({ userData }: IUsersProps) => {
  const [newUserData, setNewUserData] = useState<ILeagueUsers[]>();

  useEffect(() => {
    if (userData) {
      const tempUsers = userData.league_users.filter(
        (user) => user.role === "user" && user.users.is_active === true
      );

      setNewUserData(tempUsers);
    }
  }, [userData]);

  return (
    <div>
      {newUserData && newUserData.length > 0 ? (
        <div>
          {newUserData.map((user) => {
            return (
              <div className="flex gap-[15px]  mt-[10px] max-w-[80%] mx-auto">
                <div className="bg-primary text-white rounded-[22px] h-[30px] pt-[2px] text-[18px] ml-[30px] px-[9px] mt-[5px]">
                  {user.users.username[0].toUpperCase()}
                </div>
                <p className="text-primary text-[25px] hover:underline cursor-pointer">
                  {user.users.username}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-red mt-[15px] text-[20px]">No Member found...</p>
      )}
    </div>
  );
};

export default Members;
