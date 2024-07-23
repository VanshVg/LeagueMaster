import { useState } from "react";
import { ILeagueMatches, ITypes } from "../../../types/types";
import { PrimaryButton } from "../../Buttons/Buttons";
import UpdateResult from "../../Modals/UpdateResult";

type IRecentMatchCardProps = {
  data: ILeagueMatches;
  changeResultHandler: () => void;
};

const types: ITypes = {
  1: "League",
  2: "Round of 32",
  3: "Round of 16",
  4: "Quarter Final",
  5: "Semi Final",
  6: "Final",
};

const MatchCard = ({ data, changeResultHandler }: IRecentMatchCardProps) => {
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  return (
    <div className="border-[1px] text-primaryText border-primaryText py-[10px] mx-auto mt-[15px] rounded-[4px] h-[200px]">
      <div className="flex justify-between px-[10px]">
        <p>Match Number : {data.match_number}</p>
        <p>{types[data.match_type_id]} Match</p>
      </div>
      {data.status !== "pending" && (
        <>
          {data.extra_time ? (
            <p className="text-[20px]">120'</p>
          ) : (
            <p className="text-[20px]">90'</p>
          )}
        </>
      )}
      <div className="flex justify-center gap-[20px] max-h-[60px] px-[10px] mt-[20px]">
        <p className="text-primary text-[20px] w-[45%] text-right mt-[13px]">
          {data.home_team.team_name.length > 20
            ? data.home_team.team_name.slice(0, 20) + "..."
            : data.home_team.team_name}
        </p>
        {data.status === "pending" ? (
          <p className="text-[40px] text-secondary">VS</p>
        ) : (
          <div className="flex text-[40px] text-secondary">
            <div>
              <p>{data.home_team_score}</p>
              {data.penalties && (
                <p className="text-[20px] -mt-[15px]">({data.match_penalty.home_team_score})</p>
              )}
            </div>
            <p className="ml-[5px] mr-[5px]">:</p>
            <div>
              <p>{data.away_team_score}</p>
              {data.penalties && (
                <p className="text-[20px] -mt-[15px]">({data.match_penalty.away_team_score})</p>
              )}
            </div>
          </div>
        )}

        <p className="text-primary text-[20px] text-left w-[45%] mt-[13px]">
          {data.away_team.team_name.length > 20
            ? data.away_team.team_name.slice(0, 20) + "..."
            : data.away_team.team_name}
        </p>
      </div>
      {data.status === "pending" && (
        <>
          <div
            className="inline-block mt-[20px]"
            onClick={() => {
              setIsResultOpen(true);
            }}
          >
            <PrimaryButton name="Update Result" />
          </div>
          <UpdateResult
            isOpen={isResultOpen}
            onRequestClose={() => {
              changeResultHandler();
              setIsResultOpen(false);
            }}
            data={data}
          />
        </>
      )}
    </div>
  );
};

export default MatchCard;
