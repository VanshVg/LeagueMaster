import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../Buttons/Buttons";

const LandingNavbar = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-[20px]">
      <div className="flex w-[500px]">
        <img src="/icons/football.svg" alt="football" className="h-[50px]" />
        <h1 className="text-primary font-poppins font-semibold text-[35px] ml-[10px]">{title}</h1>
      </div>
      <div className="flex justify-between gap-[20px]">
        <div onClick={() => navigate("/auth/register")}>
          <PrimaryButton name={"Sign Up"} />
        </div>
        <div onClick={() => navigate("/auth/login")}>
          <SecondaryButton name={"Login"} />
        </div>
      </div>
    </div>
  );
};

export default LandingNavbar;
