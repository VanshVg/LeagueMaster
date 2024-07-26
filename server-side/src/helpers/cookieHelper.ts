import { Request } from "express";

export const cookieExtractor = (req: Request): string => {
  let token: string = "";
  if (req?.headers?.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  return token;
};
