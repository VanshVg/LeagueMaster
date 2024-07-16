import { Link } from "react-router-dom";

type ILeagueNavbarCardProps = {
  navigateTo: string;
  active: boolean;
  name: string;
};

const LeagueNavbarCard = ({ navigateTo, active, name }: ILeagueNavbarCardProps) => {
  return (
    <Link to={navigateTo}>
      <div
        className={
          active
            ? "text-secondary underline cursor-pointer hover:bg-lightBg hover:underline p-[10px] px-[20px]"
            : "text-primary cursor-pointer hover:bg-lightBg hover:underline p-[10px] px-[20px]"
        }
      >
        {name}
      </div>
    </Link>
  );
};

export default LeagueNavbarCard;
