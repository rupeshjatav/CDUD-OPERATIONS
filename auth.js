import jwt from "jsonwebtoken";
const JWT_SECRET = "abcdef";

function Authentication(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);

  console.log(decodedData);

  if (decodedData) {
    req.userId = decodedData.id;
  }
  next();
}

export { Authentication, JWT_SECRET };
