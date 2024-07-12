import express, { Router } from "express";

import * as userController from "../controllers/userController";
import { updatePasswordValidator, updateUsernameValidator } from "../validators/UserValidators";

const router: Router = express.Router();

router.get("/profile", userController.getProfile);
router.put("/username", updateUsernameValidator, userController.updateUsername);
router.put("/password", updatePasswordValidator, userController.updatePassword);
router.put("/remove", userController.deleteAccount);

export default router;
