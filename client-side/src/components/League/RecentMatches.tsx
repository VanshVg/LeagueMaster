import { ILeagueMatches } from "../../types";
import MatchCard from "./MatchCard";

type IRecentMatchesProps = {
  leagueMatches: ILeagueMatches[] | undefined;
};

const RecentMatches = ({ leagueMatches }: IRecentMatchesProps) => {
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
            <MatchCard />
            <MatchCard />
            <MatchCard />
          </div>
          <p className="mt-[20px] cursor-pointer text-link hover:underline">View All Matches</p>
        </div>
      )}
    </div>
  );
};

export default RecentMatches;
