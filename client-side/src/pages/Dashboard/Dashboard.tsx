import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="h-screen">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
