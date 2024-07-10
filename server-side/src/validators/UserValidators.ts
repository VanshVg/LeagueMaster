import { ValidationChain, body } from "express-validator";

export const updateUsernameValidator: ValidationChain[] = [
  body("username").notEmpty().withMessage("Username can't be empty."),
];

export const updatePasswordValidator: ValidationChain[] = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Password can't be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long...!!"),
  body("newPassword")
    .notEmpty()
    .withMessage("Password can't be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long...!!"),
];
