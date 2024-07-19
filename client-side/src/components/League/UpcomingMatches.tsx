import { ILeagueMatches } from "../../types/types";
import RecentMatchCard from "./RecentMatchCard";

type IUpcomingMatchesProps = {
  leagueMatches: ILeagueMatches[] | undefined;
};

const UpcomingMatches = ({ leagueMatches }: IUpcomingMatchesProps) => {
  const recentLeagueMatches = leagueMatches?.filter((match) => {
    return match.home_team_score === null;
  });
  return (
    <div>
      {recentLeagueMatches?.length !== 0 ? (
        <p className="text-red text-[18px]">No recent matches available...</p>
      ) : (
        <div>
          <div>
            <RecentMatchCard />
            <RecentMatchCard />
            <RecentMatchCard />
          </div>
          <p className="mt-[20px] cursor-pointer text-link hover:underline">View All Matches</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingMatches;
