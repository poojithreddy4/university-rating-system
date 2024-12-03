import cors from "cors";
import express from "express";
import path from "path";
import initDB from "./db/index.js";
import router from "./routes/index.js";

const app = express();
const STATIC_FILES_DIR = path.join(process.cwd(), "public");

app.use(cors());
app.use(express.json());

// Database
initDB();

// Router
router(app);

app.get("*", (req, res) => {
  return res.sendFile(path.join(STATIC_FILES_DIR, "index.html"));
});

// const server = app.listen(PORT, () => console.log("Listening on port", PORT));

export default app;
