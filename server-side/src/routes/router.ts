import express, { Router } from "express";

import authRoutes from "./authRouter";
import leagueRoutes from "./leagueRouter";
import { applyPassportStrategy } from "../middlewares/passport";

applyPassportStrategy();

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/league", leagueRoutes);

export default router;
