import express, { Router } from "express";
import * as matchController from "../controllers/matchController";
import { checkLeagueRole } from "../middlewares/checkRole";

const router: Router = express.Router();

router.post("/:leagueId/generate", checkLeagueRole, matchController.generateMatches);
router.get("/:leagueId", matchController.getMatches);

export default router;
