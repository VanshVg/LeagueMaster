import { ValidationChain, body } from "express-validator";

export const leagueValidator: ValidationChain[] = [
  body("leagueName").notEmpty().withMessage("League name can't be empty."),
  body("type").notEmpty().withMessage("League type can't be empty."),
];
