import express, { Router } from "express";

import * as teamController from "../controllers/teamController";

const router: Router = express.Router();

router.get("/standings/:leagueId", teamController.teamStandings);

export default router;
