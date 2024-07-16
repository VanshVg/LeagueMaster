import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import LeagueNavbar from "../../components/League/LeagueNavbar";
import PointsTable from "../../components/League/PointsTable";

const Standings = () => {
  return (
    <div className="h-screen font-ss3">
      <Helmet>
        <title>Standings</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] pb-[100px] overflow-y-auto">
            <LeagueNavbar active={"standings"} />
            <div>
              <h1 className="text-[35px] text-primary">Standings</h1>
              <div className="h-[1px] bg-secondary w-[80%] mx-auto"></div>
              <PointsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Standings;
