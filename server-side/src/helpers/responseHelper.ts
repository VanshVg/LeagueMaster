import { Response } from "express";

export const generalResponse = (
  res: Response,
  statusCode: number = 200,
  data: [] | {} | null = null,
  type: string = "",
  message: string = "",
  toast: boolean = false
): Response => {
  return res.status(statusCode).json({
    data: data,
    type: type,
    message: message,
    toast: toast,
  });
};
