import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1440px] mx-auto">
      <Helmet>
        <title>League Master</title>
      </Helmet>
      <div className="flex justify-between p-[20px]">
        <div className="flex w-[500px]">
          <img src="/icons/football.svg" alt="football" className="h-[50px]" />
          <h1 className="text-primary font-poppins font-semibold text-[35px] ml-[10px]">
            League Master
          </h1>
        </div>
        <div className="flex justify-between gap-[20px]">
          <div
            className="text-primary border-[1px] max-h-[50px] text-[18px] border-primary rounded-[6px] p-[10px] w-[100px] duration-300 ease-out hover:bg-primary hover:text-white hover:border-white cursor-pointer"
            onClick={() => navigate("/auth/register")}
          >
            Sign Up
          </div>
          <div
            className="text-white border-[1px] border-white max-h-[50px] text-[18px] bg-primary rounded-[6px] p-[10px] w-[100px] duration-300 ease-out hover:bg-white hover:text-primary hover:border-primary cursor-pointer"
            onClick={() => navigate("/auth/login")}
          >
            Sign In
          </div>
        </div>
      </div>
      <div className="text-center mt-[30px]">
        <div className="text-primaryText text-[70px] font-bold">
          <h2>Manage.</h2>
          <h2 className="text-[65px]">Engage.</h2>
          <h2 className="text-[65px]">Prevail.</h2>
        </div>
        <p className="text-[20px] text-primaryText mt-[30px] max-w-[75%] mx-auto">
          Empower your sports leagues with seamless organization. From team creation to match
          results, track every detail effortlessly. Elevate competition, celebrate victories, and
          redefine league management.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
