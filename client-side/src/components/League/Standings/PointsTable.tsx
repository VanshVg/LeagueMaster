import "./PointsTable.css";

const PointsTable = () => {
  return (
    <div className="w-[80%] mx-auto">
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
          <tr>
            <td className="font-bold">1</td>
            <td>Barcelona</td>
            <td>38</td>
            <td>26</td>
            <td>5</td>
            <td>7</td>
            <td>79</td>
            <td>44</td>
            <td>35</td>
            <td className="font-bold">85</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PointsTable;
