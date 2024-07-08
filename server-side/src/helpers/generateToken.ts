import jwt from "jsonwebtoken";

const EXPIRATION_TIME = 31 * 24 * 60 * 60 * 1000;

export const generateToken = (username: string): string => {
  return jwt.sign(
    {
      data: {
        username: username,
      },
    },
    process.env.SECRET_KEY as string,
    { expiresIn: EXPIRATION_TIME }
  );
};
