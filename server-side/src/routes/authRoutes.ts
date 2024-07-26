import express, { Router } from "express";

import * as authController from "../controllers/authController";
import {
  authValidator,
  resetPasswordValidator,
  verifyAccountValidator,
} from "../validators/AuthValidators";

const router: Router = express.Router();

router.post("/register", authValidator, authController.register);
router.put("/activate/:token", authController.activateAccount);
router.post("/login", authValidator, authController.login);
router.post("/verify", verifyAccountValidator, authController.verify);
router.put("/reset/:token", resetPasswordValidator, authController.resetPassword);

export default router;
