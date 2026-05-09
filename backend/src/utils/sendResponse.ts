import { Response } from "express";

type SendResponseOptions<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  payload: SendResponseOptions<T>,
) => {
  return res.status(statusCode).json(payload);
};
