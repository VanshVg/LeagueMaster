import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import LeagueNavbar from "../../components/League/LeagueNavbar";

const About = () => {
  return (
    <div className="h-screen font-ss3">
      <Helmet>
        <title>About</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] pb-[100px] overflow-y-auto">
            <LeagueNavbar active={"about"} />
            <h1 className="text-[35px] text-primary">About</h1>
            <div className="h-[1px] bg-secondary w-[80%] mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
