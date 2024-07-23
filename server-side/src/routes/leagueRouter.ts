import express, { Router } from "express";

import * as leagueController from "../controllers/leagueController";
import { joinLeagueValidator, leagueValidator } from "../validators/LeagueValidators";

const router: Router = express.Router();

router.post("/create", leagueValidator, leagueController.createLeague);
router.get("/types", leagueController.getLeagueTypes);
router.get("/leagues", leagueController.getUserLeagues);
router.put("/join", joinLeagueValidator, leagueController.joinLeague);
router.get("/:leagueId", leagueController.getOneLeague);

export default router;
