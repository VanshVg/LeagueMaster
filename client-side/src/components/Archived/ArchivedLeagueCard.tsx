import { ILeagues } from "../../types/types";

type IArchivedLeagueCardProps = {
  data: ILeagues;
};

const ArchivedLeagueCard = ({ data }: IArchivedLeagueCardProps) => {
  return (
    <div className="border-[1px] border-primaryText rounded-[3px] border-opacity-[60%] pb-[15px]">
      <h2 className="text-primary text-[20px]">{data.name}</h2>
      <div className="h-[1px] bg-secondary w-[80%] mx-auto" />
    </div>
  );
};

export default ArchivedLeagueCard;
