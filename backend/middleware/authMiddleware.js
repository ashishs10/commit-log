import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({
        message: "authorization token missing",
      });
      return;
    }

    const authorizationHeader = req.headers.authorization.split(" ");

    if (authorizationHeader.length !== 2) {
      res.status(401).json({
        message: "not valid token",
      });
      return;
    }

    if (authorizationHeader[0] !== "Bearer") {
      res.status(401).json({
        message: "not valid token",
      });
      return;
    }

    const token = authorizationHeader[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
    return;
  }
}

export default {
  authMiddleware,
};
