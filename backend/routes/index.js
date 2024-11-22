import authRouter from "./auth-router.js";
import questionsRouter from "./questions-router.js";
import ratingsRouter from "./ratings-router.js";
import universityRouter from "./university-router.js";

const router = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/universities", universityRouter);
  app.use("/api/questions", questionsRouter);
  app.use("/api/ratings", ratingsRouter);
};

export default router;
