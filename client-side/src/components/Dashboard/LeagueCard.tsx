import { useNavigate } from "react-router-dom";
import { ITypes, IUserLeagues } from "../../types/types";

const types: ITypes = {
  1: "League",
  2: "Knockouts",
  3: "League+Knockouts",
  4: "Groups+Knockouts",
};

type ILeagueCardProps = {
  league: IUserLeagues;
};

const LeagueCard = ({ league }: ILeagueCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-[calc(100%/2)] p-[15px]">
      <div
        className="border-[1px] border-[gray] rounded-[4px] hover:scale-105 duration-300 ease-in cursor-pointer hover:border-primary p-[10px]"
        onClick={() => navigate(`/league/${league.id}`)}
      >
        <div>
          <h1 className="text-center text-primary font-semibold text-[25px] font-ss3">
            {league.name}
          </h1>
        </div>
        <p className="text-[gray] mt-[10px]">{types[league.type_id as keyof ITypes]} Format</p>
        <div className="h-[1px] bg-secondary mt-[10px] max-w-[80%] mx-auto"></div>
        <div className="flex justify-between mx-auto text-primaryText mt-[15px] max-w-[80%] text-[15px]">
          <p>Total Teams: {league.teams?.length}</p>
          <p>Total Matches: {league.league_matches?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default LeagueCard;
