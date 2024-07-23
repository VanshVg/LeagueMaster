import { useEffect, useState } from "react";
import "./PointsTable.css";
import { IApiResponse, ITeams } from "../../../types/types";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";

const PointsTable = () => {
  const [teams, setTeams] = useState<ITeams[]>();

  const leagueId = useParams().leagueId;
  const { callApi } = useAxios();

  const fetchData = async () => {
    try {
      const result: IApiResponse = await callApi({
        url: `/teams/standings/${leagueId}`,
        method: "GET",
        data: {},
        params: {},
      });
      if (result.type === "success") {
        setTeams(result.data as ITeams[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-[80%] mx-auto">
      {teams && teams.length > 0 ? (
        <table className="mx-auto mt-[20px]">
          <thead>
            <tr>
              <td>Sr. No.</td>
              <td>Team Name</td>
              <td>Matches</td>
              <td>Wins</td>
              <td>Losses</td>
              <td>Draws</td>
              <td>GF</td>
              <td>GA</td>
              <td>GD</td>
              <td>Points</td>
            </tr>
          </thead>
          <tbody className="text-[18px]">
            {teams &&
              teams.map((team, index) => {
                return (
                  <tr>
                    <td className="font-bold">{index + 1}</td>
                    <td>{team.team_name}</td>
                    <td>{team.matches_played}</td>
                    <td>{team.matches_won}</td>
                    <td>{team.matches_lost}</td>
                    <td>{team.matches_played - team.matches_won - team.matches_lost}</td>
                    <td>{team.goals_scored}</td>
                    <td>{team.goals_conceded}</td>
                    <td>{team.goals_scored - team.goals_conceded}</td>
                    <td className="font-bold">{team.points}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <p className="text-red mt-[10px]">No teams have been added...</p>
      )}
    </div>
  );
};

export default PointsTable;
