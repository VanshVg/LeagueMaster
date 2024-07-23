import express, { Router } from "express";

import * as teamController from "../controllers/teamController";
import { checkLeagueRole } from "../middlewares/checkRole";

const router: Router = express.Router();

router.post("/:leagueId", checkLeagueRole, teamController.addTeams);
router.get("/standings/:leagueId", teamController.teamStandings);

export default router;
