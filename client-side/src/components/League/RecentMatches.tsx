import { useNavigate, useParams } from "react-router-dom";
import { ILeagueMatches } from "../../types/types";
import MatchCard from "./Matches/MatchCard";

type IRecentMatchesProps = {
  leagueMatches: ILeagueMatches[] | undefined;
  changeResultHandler: () => void;
};

const RecentMatches = ({ leagueMatches, changeResultHandler }: IRecentMatchesProps) => {
  const recentLeagueMatches = leagueMatches?.filter((match) => {
    return match.status === "completed";
  });

  const navigate = useNavigate();
  const leagueId = useParams().leagueId;
  return (
    <div>
      {recentLeagueMatches?.length === 0 ? (
        <p className="text-red text-[18px]">No recent matches available...</p>
      ) : (
        <div>
          <div className="px-[10px]">
            {recentLeagueMatches &&
              recentLeagueMatches.reverse().map((match, index) => {
                return (
                  <>
                    {index < 3 && (
                      <MatchCard data={match} changeResultHandler={changeResultHandler} />
                    )}
                  </>
                );
              })}
          </div>
          <p
            className="mt-[20px] cursor-pointer text-link hover:underline"
            onClick={() => {
              navigate(`/league/${leagueId}/matches`);
            }}
          >
            View All Matches
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentMatches;
