import Helmet from "react-helmet";

import LandingNavbar from "../components/LandingPage/LandingNavbar";

type ILandingDetails = {
  title: string;
  slogan: string[];
  description: string;
};

const LandingPage = () => {
  const landingDetails: ILandingDetails = {
    title: "League Master",
    slogan: ["Manage.", "Engage.", "Prevail."],
    description:
      "Empower your sports leagues with seamless organization. From team creation to match results, track every detail effortlessly. Elevate competition, celebrate victories, and redefine league management.",
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <Helmet>
        <title>{landingDetails.title}</title>
      </Helmet>
      <LandingNavbar title={landingDetails.title} />
      <div className="text-center mt-[30px]">
        <div className="text-primaryText text-[70px] font-bold">
          <h2>{landingDetails.slogan[0]}</h2>
          <h2 className="text-[65px]">{landingDetails.slogan[1]}</h2>
          <h2 className="text-[65px]">{landingDetails.slogan[2]}</h2>
        </div>
        <p className="text-[20px] text-primaryText mt-[30px] max-w-[75%] mx-auto">
          {landingDetails.description}
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
