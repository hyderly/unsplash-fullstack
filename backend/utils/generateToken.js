import jwt from "jsonwebtoken";

const generateWebToken = id => {
  const token = jwt.sign({ id }, process.env.jwt_secret);
  return token;
};

export default generateWebToken;
