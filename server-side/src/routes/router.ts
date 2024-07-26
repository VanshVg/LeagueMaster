import express, { Router } from "express";
import passport from "passport";

import authRoutes from "./authRoutes";
import leagueRoutes from "./leagueRoutes";
import userRoutes from "./userRouter";
import matchRoutes from "./matchRoutes";
import teamRoutes from "./teamRoutes";
import { applyPassportStrategy } from "../middlewares/passport";

applyPassportStrategy();

const auth = passport.authenticate("jwt", { session: false, failureRedirect: "/login" });

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/leagues", auth, leagueRoutes);
router.use("/user", auth, userRoutes);
router.use("/matches", auth, matchRoutes);
router.use("/teams", auth, teamRoutes);

export default router;
