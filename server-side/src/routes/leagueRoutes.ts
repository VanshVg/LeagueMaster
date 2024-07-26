import express, { Router } from "express";

import * as leagueController from "../controllers/leagueController";
import { joinLeagueValidator, leagueValidator } from "../validators/LeagueValidators";

const router: Router = express.Router();

router.post("/", leagueValidator, leagueController.createLeague);
router.get("/types", leagueController.getLeagueTypes);
router.get("/", leagueController.getUserLeagues);
router.put("/join", joinLeagueValidator, leagueController.joinLeague);
router.get("/archived", leagueController.getArchivedLeagues);
router.get("/:leagueId", leagueController.getOneLeague);
router.get("/:leagueId/users", leagueController.getUsers);

export default router;
