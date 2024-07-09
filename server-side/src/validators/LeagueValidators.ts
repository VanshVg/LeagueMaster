import { ValidationChain, body } from "express-validator";

export const leagueValidator: ValidationChain[] = [
  body("leagueName").trim().notEmpty().withMessage("League name can't be empty."),
  body("type").trim().notEmpty().withMessage("League type can't be empty."),
];

export const joinLeagueValidator: ValidationChain[] = [
  body("leagueCode").trim().notEmpty().withMessage("League code can't be empty."),
];
