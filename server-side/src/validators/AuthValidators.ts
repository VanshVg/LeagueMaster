import { ValidationChain, body } from "express-validator";

export const authValidator: ValidationChain[] = [
  body("username").notEmpty().withMessage("Username can't be empty."),
  body("password")
    .notEmpty()
    .withMessage("Password can't be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long...!!"),
];

export const verifyAccountValidator: ValidationChain[] = [
  body("username").notEmpty().withMessage("Username can't be empty."),
];

export const resetPasswordValidator: ValidationChain[] = [
  body("password")
    .notEmpty()
    .withMessage("Password can't be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long...!!"),
];
