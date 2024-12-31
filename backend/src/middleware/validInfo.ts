import { Request, Response, NextFunction } from "express";

const validInfo = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  next();
};

export default validInfo;
