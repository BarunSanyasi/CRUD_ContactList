import jwt from "jsonwebtoken";

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string);
};

export default generateToken;
