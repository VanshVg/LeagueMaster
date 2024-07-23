import { Link, useLocation } from "react-router-dom";
import { IUserLeagues } from "../../types/types";

type ISidebarLeagues = {
  userLeagues: IUserLeagues[] | undefined;
};

const LeagueSidebarListing = ({ userLeagues }: ISidebarLeagues) => {
  const location = useLocation();
  return (
    <div className="mt-[10px] font-ss3">
      {userLeagues &&
        userLeagues.map((league) => {
          return (
            <Link to={`/league/${league.id}`}>
              <div
                className={
                  location.pathname.includes(`/league/${league.id}`)
                    ? "flex max-w-[90%] gap-[10px]  rounded-r-[15px] cursor-pointer duration-200 ease-in p-[5px] px-[15px] bg-skyBlue mt-[5px]"
                    : "flex max-w-[90%] gap-[10px] rounded-r-[15px] hover:bg-lightBg  cursor-pointer duration-200 ease-in p-[5px] px-[15px] mt-[5px]"
                }
              >
                <div className="bg-primary text-white rounded-[22px] h-[30px] pt-[2px] ml-[30px] px-[10px]">
                  {league.name[0].toUpperCase()}
                </div>
                <p className="text-[16px] text-primaryText mt-[2px]">
                  {league.name.length > 13 ? league.name.slice(0, 13) + "..." : league.name}
                </p>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default LeagueSidebarListing;
