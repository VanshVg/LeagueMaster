import { Snackbar, Tooltip } from "@mui/material";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ILeagueTypes, IUserLeagues } from "../../types";

type ILeagueDetailsProps = {
  leagueData: IUserLeagues | undefined;
};

const types: ILeagueTypes = {
  1: "League",
  2: "Knockouts",
  3: "League+Knockouts",
  4: "Groups+Knockouts",
};

const LeagueDetails = ({ leagueData }: ILeagueDetailsProps) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  return (
    <div className="text-[22px] mt-[10px] text-left px-[10px]">
      <div className="flex gap-[10px]">
        <p className="font-bold">Joining Code:</p>
        <span>{leagueData?.joining_code}</span>
        <CopyToClipboard
          text={leagueData?.joining_code as string}
          onCopy={() => {
            setOpenSnackbar(true);
          }}
        >
          <Tooltip title={"copy"}>
            <img
              src="/icons/copy.svg"
              alt="copy"
              className="cursor-pointer hover:bg-lightBg p-[8px] rounded-[22px] -mt-[3px]"
            />
          </Tooltip>
        </CopyToClipboard>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          message="League code copied to clipboard"
        ></Snackbar>
      </div>
      <div>
        <p>League Format: {types[leagueData?.type_id as keyof ILeagueTypes]}</p>
      </div>
      <div>
        <p>Total Teams: {leagueData?.teams.length}</p>
      </div>
    </div>
  );
};

export default LeagueDetails;
