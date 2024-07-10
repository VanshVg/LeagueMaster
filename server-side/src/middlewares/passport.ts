import { Request } from "express";
import { Strategy, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { config } from "dotenv";
import passport from "passport";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../prisma/script";
import { users } from "@prisma/client";

config();

const cookieExtractor = (req: Request): string => {
  let token: string = "";
  if (JSON.stringify(req.cookies) !== "{}" || req.headers.token !== undefined) {
    token = req.cookies.token || (req.headers.token as string).split(",")[0];
  }
  return token;
};

export const applyPassportStrategy = () => {
  let jwt;
  try {
    jwt = cookieExtractor;

    const options: StrategyOptions = {
      jwtFromRequest: jwt,
      secretOrKey: process.env.SECRET_KEY as string,
    };

    passport.use(
      new Strategy(options, async (jwt_payload: JwtPayload, done: VerifiedCallback) => {
        const isUser: users | null = await prisma.users.findFirst({
          where: { username: { equals: jwt_payload.data.username, mode: "insensitive" } },
        });
        if (isUser === null) {
          return done(null, false);
        } else {
          return done(null, isUser);
        }
      })
    );
  } catch (error) {
    return null;
  }
};
