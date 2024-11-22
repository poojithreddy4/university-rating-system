import authRouter from "./auth-router.js";
import universityRouter from "./university-router.js";

const router = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/universities", universityRouter);
};

export default router;
