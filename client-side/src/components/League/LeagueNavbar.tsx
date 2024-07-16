import { useParams } from "react-router-dom";
import LeagueNavbarCard from "./LeagueNavbarCard";

type ILeagueNavbarProps = {
  active: string;
};

const LeagueNavbar = ({ active }: ILeagueNavbarProps) => {
  const leagueId = useParams().leagueId;
  return (
    <div className="flex dashboard-navbar justify-center px-[30px] mx-auto shadow-[0.5px_0.5px_0.5px_0.5px_gray] mb-[25px] pt-[2px]">
      <LeagueNavbarCard
        navigateTo={`/league/${leagueId}`}
        active={active === "league" ? true : false}
        name={"League"}
      />
      <LeagueNavbarCard
        navigateTo={`/league/${leagueId}/teams`}
        active={active === "teams" ? true : false}
        name={"Teams"}
      />
      <LeagueNavbarCard
        navigateTo={`/league/${leagueId}/standings`}
        active={active === "standings" ? true : false}
        name={"Standings"}
      />
      <LeagueNavbarCard
        navigateTo={`/league/${leagueId}/matches`}
        active={active === "matches" ? true : false}
        name={"Matches"}
      />
      <LeagueNavbarCard
        navigateTo={`/league/${leagueId}/users`}
        active={active === "users" ? true : false}
        name={"Users"}
      />
    </div>
  );
};

export default LeagueNavbar;
