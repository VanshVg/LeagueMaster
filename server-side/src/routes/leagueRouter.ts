import express, { Router } from "express";

import * as leagueController from "../controllers/leagueController";
import { joinLeagueValidator, leagueValidator } from "../validators/LeagueValidators";
import { checkLeagueRole } from "../middlewares/checkRole";

const router: Router = express.Router();

router.post("/create", leagueValidator, leagueController.createLeague);
router.get("/types", leagueController.getLeagueTypes);
router.get("/leagues", leagueController.getUserLeagues);
router.put("/join", joinLeagueValidator, leagueController.joinLeague);
router.get("/:leagueId", leagueController.getOneLeague);
router.post("/teams/:leagueId", checkLeagueRole, leagueController.addTeams);

export default router;
