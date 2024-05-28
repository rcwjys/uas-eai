import { prisma } from "../controllers/authController.js";

const tryCatch = (controller) => (async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (err) {
    return next(err);
  } finally {
    await prisma.$disconnect();
  }
});

export {tryCatch};