import cors from "cors";
import express from "express";
import { PORT_NUMBER } from "./config.js";
import initDB from "./db/index.js";
import router from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// Database
initDB();

// Router
router(app);

const PORT = process.env.PORT || PORT_NUMBER;
app.listen(PORT, () => console.log("Listening on port", PORT));
