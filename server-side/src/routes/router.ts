import express, { Router } from "express";
import passport from "passport";

import authRoutes from "./authRouter";
import leagueRoutes from "./leagueRouter";
import userRoutes from "./userRouter";
import { applyPassportStrategy } from "../middlewares/passport";

applyPassportStrategy();

const auth = passport.authenticate("jwt", { session: false, failureRedirect: "/login" });

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/league", auth, leagueRoutes);
router.use("/user", auth, userRoutes);

export default router;
