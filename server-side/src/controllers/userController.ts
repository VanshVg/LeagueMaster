import { Request, Response } from "express";
import { users } from "@prisma/client";
import { Result, ValidationError, validationResult } from "express-validator";
import argon2 from "argon2";

import { generalResponse } from "../helpers/responseHelper";
import UserRepository from "../repositories/UserRepository";
import { logger } from "../utils/logger";
import { generateToken } from "../helpers/generateToken";

const userRepository = new UserRepository();

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as users).id;
    const user: users | null = await userRepository.getOne({ id: userId });
    if (user === null) {
      return generalResponse(res, 403, null, "unauthorised", "User isn't authorised");
    }

    return generalResponse(res, 200, user, "success", "Fetched user profile successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};

export const updateUsername = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 400, null, "payload", "Invalid Payload");
    }

    const { username } = req.body;
    const userId = (req.user as users).id;

    const user: users | null = await userRepository.getFirst({
      id: userId,
      is_active: true,
      deleted_at: null,
    });
    if (user === null) {
      return generalResponse(res, 403, null, "unauthorised", "User isn't authorised");
    }

    const isUser: users | null = await userRepository.getFirst({
      username: { equals: username, mode: "insensitive" },
      is_active: true,
      deleted_at: null,
    });
    if (isUser !== null) {
      return generalResponse(res, 409, null, "conflict", "Username already exists");
    }

    await userRepository.updateById(user.id, { username: username });

    const token: string = generateToken(username);
    return generalResponse(res, 200, token, "success", "Username updated successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return generalResponse(res, 400, null, "payload", "Invalid Payload");
    }

    const { currentPassword, newPassword } = req.body;
    const userId = (req.user as users).id;

    if (currentPassword === newPassword) {
      return generalResponse(
        res,
        409,
        null,
        "conflict",
        "Current Password and New password can't be same"
      );
    }

    const user: users | null = await userRepository.getFirst({
      id: userId,
      is_active: true,
      deleted_at: null,
    });
    if (user === null) {
      return generalResponse(res, 403, null, "unauthorised", "User isn't authorised");
    }

    if (!(await argon2.verify(user.password, currentPassword))) {
      return generalResponse(res, 401, null, "password", "Current password is wrong");
    }

    const hashedPassword: string = await argon2.hash(newPassword);
    await userRepository.updateById(user.id, { password: hashedPassword });

    return generalResponse(res, 200, null, "success", "Password updated successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { currentPassword } = req.body;
    const userId = (req.user as users).id;
    const user: users | null = await userRepository.getOne({ id: userId });
    if (user === null) {
      return generalResponse(res, 401, null, "unauthorised", "User isn't authorised");
    }

    if (!(await argon2.verify(user.password, currentPassword))) {
      return generalResponse(res, 401, null, "invalid", "Invalid password");
    }

    await userRepository.updateById(user.id, { is_active: false, deleted_at: new Date() });
    return generalResponse(res, 200, null, "success", "User deleted successfully");
  } catch (error) {
    logger.error(error);
    return generalResponse(res, 500, null, "server", "Internal Server Error");
  }
};
