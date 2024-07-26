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

const userRepository = new UserRepository();

const expirationMinutes = 60;

export const register = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 400, null, "payload", "Invalid Payload", true);
    }

    const { username, password } = req.body;

    const isUser: users | null = await userRepository.getFirst({
      username: { equals: username, mode: "insensitive" },
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
          return generalResponse(res, 409, null, "username", "Username already exists", true);
        }
      } else {
        return generalResponse(res, 409, null, "username", "Username already exists", true);
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
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal server error");
  }
};

export const activateAccount = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const isUser: users | null = await userRepository.getFirst({
      verification_token: token,
      is_active: false,
      deleted_at: null,
    });
    if (isUser === null) {
      return generalResponse(
        res,
        403,
        null,
        "unauthorised",
        "User isn't authorised to access this page",
        true
      );
    }

    if (isUser.is_active) {
      return generalResponse(res, 409, null, "conflict", "Account is already activated", true);
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
        "Token is expired. Please register again.",
        true
      );
    }

    await userRepository.updateById(isUser.id, { is_active: true });
    return generalResponse(res, 200, null, "success", "Account activation successful", true);
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal server error");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 400, null, "payload", "Invalid Payload", true);
    }

    const { username, password } = req.body;

    const isUser: users | null = await userRepository.getFirst({
      username: { equals: username, mode: "insensitive" },
      is_active: true,
      deleted_at: null,
    });
    if (isUser === null) {
      return generalResponse(res, 403, null, "credentials", "Invalid Credentials", true);
    }

    if (!(await argon2.verify(isUser.password, password))) {
      return generalResponse(res, 403, null, "credentials", "Invalid Credentials", true);
    }

    if (!isUser.is_active) {
      return generalResponse(res, 403, null, "inactive", "Account isn't activated", true);
    }

    const token: string = generateToken(username);
    return generalResponse(res, 200, { token: token }, "success", "User login successful", true);
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal server error");
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 400, null, "payload", "Invalid Payload", true);
    }

    const { username } = req.body;
    const isUser: users | null = await userRepository.getFirst({
      username: { equals: username, mode: "insensitive" },
      deleted_at: null,
    });

    if (isUser === null) {
      return generalResponse(res, 403, null, "username", "Invalid username", true);
    }

    if (!isUser.is_active) {
      return generalResponse(res, 403, null, "conflict", "Account isn't activated", true);
    }

    const resetToken = randomString.generate({
      length: 12,
      charset: "alphanumeric",
    });

    await userRepository.updateById(isUser.id, { reset_token: resetToken, reset_time: new Date() });

    return generalResponse(res, 200, { resetToken: resetToken }, "success", "Username is valid");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal server error");
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 400, null, "payload", "Invalid Payload", true);
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
        "Token is expired. Please register again.",
        true
      );
    }
    const hashedPassword: string = await argon2.hash(password);
    await userRepository.updateById(isUser.id, { password: hashedPassword, reset_token: null });

    return generalResponse(res, 200, null, "success", "Password reset successful", true);
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal server error");
  }
};
