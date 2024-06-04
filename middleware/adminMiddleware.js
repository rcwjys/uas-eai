import { ForbiddenError } from "../src/utils/error.js";

export function isAdmin(req, res, next) {
  if (!(req.userData.user_role === "admin")) {
    throw new ForbiddenError("not authorized");
  }
  next();
}
