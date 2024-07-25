import { IUserLeagues } from "../../types/types";

type IArchivedLeagueCardProps = {
  data: IUserLeagues;
};

const ArchivedLeagueCard = ({ data }: IArchivedLeagueCardProps) => {
  return (
    <div className="border-[1px] border-primaryText rounded-[3px] border-opacity-[60%] hover:border-primary hover:scale-110 duration-300 ease-in-out cursor-pointer pb-[5px]">
      <h2 className="text-primary text-[25px]">{data.name}</h2>
      <div className="h-[1px] bg-secondary w-[80%] mx-auto mt-[10px]" />
      <p className="mt-[10px] text-primaryText">League status: {data.status}</p>
    </div>
  );
};

export default ArchivedLeagueCard;
