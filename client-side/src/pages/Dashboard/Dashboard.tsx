import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="h-screen">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="dashboard-container h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <div className="w-[23%]">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
