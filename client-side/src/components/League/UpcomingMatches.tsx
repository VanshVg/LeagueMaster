import { useEffect, useState } from "react";
import { ILeagueMatches } from "../../types/types";
import MatchCard from "./Matches/MatchCard";
import { useNavigate, useParams } from "react-router-dom";

type IUpcomingMatchesProps = {
  leagueMatches: ILeagueMatches[] | undefined;
};

const UpcomingMatches = ({ leagueMatches }: IUpcomingMatchesProps) => {
  const [upcomingLeagueMatches, setUpcomingLeagueMatches] = useState<ILeagueMatches[]>();
  useEffect(() => {
    if (leagueMatches) {
      const update = leagueMatches.filter((match) => {
        return match.status === "pending";
      });
      setUpcomingLeagueMatches(update);
    }
  }, [leagueMatches]);

  const navigate = useNavigate();
  const leagueId = useParams().leagueId;

  return (
    <div>
      {upcomingLeagueMatches?.length === 0 ? (
        <p className="text-red text-[18px]">No recent matches available...</p>
      ) : (
        <div>
          <div>
            {upcomingLeagueMatches &&
              upcomingLeagueMatches.map((match, index) => {
                return (
                  <div className="px-[15px]" key={index}>
                    {index < 3 && <MatchCard data={match} />}
                  </div>
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

export default UpcomingMatches;
