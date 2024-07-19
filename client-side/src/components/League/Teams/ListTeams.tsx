import { ITeams } from "../../../types/types";

export type IListTeamsProps = {
  teams: ITeams[] | undefined;
};

const ListTeams = ({ teams }: IListTeamsProps) => {
  return (
    <div>
      <div className="flex flex-wrap">
        {teams &&
          teams.map((team) => {
            return (
              <div className="w-[calc(100%/5)] px-[15px] mt-[20px]">
                <h2 className="text-primary hover:scale-125 font-bold text-[20px] cursor-pointer duration-300 ease-out">
                  {team.team_name}
                </h2>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListTeams;
