import express from "express";

import {
  getRefreshToken,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { tryCatch } from "../utils/tryCatch.js";
import { authenticate } from "../../middleware/authenticateMiddleware.js";

const router = express.Router();

router.post("/api/v1/users/register", tryCatch(authenticate) ,tryCatch(register));

router.post("/api/v1/users/login", tryCatch(login));

router.post("/api/v1/users/logout", tryCatch(authenticate), tryCatch(logout));

router.post("/api/v1/users/access-token", tryCatch(getRefreshToken));

export { router as authRoutes };
