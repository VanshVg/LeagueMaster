import { Request } from "express";

export const cookieExtractor = (req: Request): string => {
  let token: string = "";
  if (JSON.stringify(req.cookies) !== "{}" || req.headers.token !== undefined) {
    token = req.cookies.token || (req.headers.token as string).split(",")[0];
  }
  return token;
};
