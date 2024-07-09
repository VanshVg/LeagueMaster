import express, { Router } from "express";

import * as leagueController from "../controllers/leagueController";
import { leagueValidator } from "../validators/LeagueValidators";
import passport from "passport";

const router: Router = express.Router();

const auth = passport.authenticate("jwt", { session: false, failureRedirect: "/login" });

router.post("/create", auth, leagueValidator, leagueController.createLeague);
router.get("/types", auth, leagueController.getLeagueTypes);

export default router;
