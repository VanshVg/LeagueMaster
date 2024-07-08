import { Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { users } from "@prisma/client";
import randomString from "randomstring";
import argon2 from "argon2";

import UserRepository from "../repositories/UserRepository";
import { logger } from "../utils/logger";
import { generalResponse } from "../helpers/responseHelper";
import { checkExpiration } from "../helpers/checkExpiration";
import { generateToken } from "../helpers/generateToken";
import prisma from "../../prisma/script";

const userRepository = new UserRepository();

const expirationMinutes = 60;

export const register = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 404, null, "payload", "Invalid Payload");
    }

    const { username, password } = req.body;

    const isUser: users | null = await userRepository.getOne({
      username: username,
      deleted_at: null,
    });
    if (isUser !== null) {
      const { id, is_active, created_at } = isUser;

      if (!is_active) {
        const createdAt: number = created_at.getTime();
        const expired: boolean = checkExpiration(createdAt, expirationMinutes);
        if (expired) {
          await userRepository.deleteById(id);
        } else {
          return generalResponse(res, 409, null, "conflict", "Username already exists");
        }
      } else {
        return generalResponse(res, 409, null, "conflict", "Username already exists");
      }
    }

    const verificationToken: string = randomString.generate({
      length: 12,
      charset: "alphanumeric",
    });
    const hashedPassword: string = await argon2.hash(password);

    await userRepository.create({
      username: username,
      password: hashedPassword,
      verification_token: verificationToken,
    });

    return generalResponse(
      res,
      200,
      { verificationToken: verificationToken },
      "success",
      "User registered successfully"
    );
  } catch (error) {
    logger.info(error);
    return generalResponse(res, 500, null, "server", "Internal server error");
  }
};

export const activateAccount = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const isUser: users | null = await userRepository.getFirst({
      verification_token: token,
      deleted_at: null,
    });
    if (isUser === null) {
      return generalResponse(
        res,
        403,
        null,
        "unauthorised",
        "User isn't authorised to access this page"
      );
    }

    if (isUser.is_active) {
      return generalResponse(res, 409, null, "conflict", "Account is already activated");
    }

    const { created_at } = isUser;
    const createdAt: number = created_at.getTime();
    const expired: boolean = checkExpiration(createdAt, expirationMinutes);
    if (expired) {
      return generalResponse(
        res,
        403,
        null,
        "unauthorised",
        "Token is expired. Please register again."
      );
    }

    await userRepository.updateById(isUser.id, { is_active: true });
    return generalResponse(res, 200, null, "success", "Account activation successful");
  } catch (error) {
    logger.info(error);
    return generalResponse(res, 500, null, "server", "Internal server error");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 404, null, "payload", "Invalid Payload");
    }

    const { username, password } = req.body;

    const isUser: users | null = await userRepository.getOne({ username: username });
    if (isUser === null) {
      return generalResponse(res, 403, null, "credentials", "Invalid Credentials");
    }

    if (!(await argon2.verify(isUser.password, password))) {
      return generalResponse(res, 403, null, "credentials", "Invalid Credentials");
    }

    if (!isUser.is_active) {
      return generalResponse(res, 403, null, "inactive", "Account isn't activated");
    }

    const token: string = generateToken(username);
    return generalResponse(res, 200, { token: token }, "success", "User login successful");
  } catch (error) {
    return generalResponse(res, 500, null, "server", "Internal server error");
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 404, null, "payload", "Invalid Payload");
    }

    const { username } = req.body;
    const isUser: users | null = await userRepository.getFirst({
      username: { equals: username, mode: "insensitive" },
      deleted_at: null,
    });

    if (isUser === null) {
      return generalResponse(res, 403, null, "username", "Invalid username");
    }

    if (!isUser.is_active) {
      return generalResponse(res, 403, null, "conflict", "Account isn't activated");
    }

    const resetToken = randomString.generate({
      length: 12,
      charset: "alphanumeric",
    });

    await userRepository.updateById(isUser.id, { reset_token: resetToken, reset_time: new Date() });

    return generalResponse(res, 200, { resetToken: resetToken }, "success", "Username is valid");
  } catch (error) {
    console.log(error);
    return generalResponse(res, 500, null, "server", "Internal server error");
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 404, null, "payload", "Invalid Payload");
    }

    const { token } = req.params;
    const { password } = req.body;

    const isUser: users | null = await userRepository.getFirst({
      reset_token: token,
      deleted_at: null,
    });
    if (isUser === null) {
      return generalResponse(
        res,
        403,
        null,
        "unauthorised",
        "User isn't authorised to access this page"
      );
    }

    const { reset_time } = isUser;

    const resetTime: number | undefined = reset_time?.getTime();

    const expired: boolean = checkExpiration(resetTime as number, expirationMinutes);
    if (expired) {
      return generalResponse(
        res,
        403,
        null,
        "unauthorised",
        "Token is expired. Please register again."
      );
    }
    const hashedPassword: string = await argon2.hash(password);
    await userRepository.updateById(isUser.id, { password: hashedPassword, reset_token: null });

    return generalResponse(res, 200, null, "success", "Password reset successful");
  } catch (error) {
    return generalResponse(res, 500, null, "server", "Internal server error");
  }
};
