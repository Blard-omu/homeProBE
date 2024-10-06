import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import AuthRouter from "./src/routes/auth.js";
import PropertyRouter from "./src/routes/property.js";
import { globalMiddleware } from "./src/middlewares/auth.js";
import { connectDb } from "./src/config/dbConfig.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json()); // For parsing req body

// Enable CORS
app.use(cors())

// middlewares
app.use(morgan("dev"));
app.use(globalMiddleware)


app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to Homepro Backend API" });
});
// Routes
app.use("/api/auth", AuthRouter);
app.use("/api", PropertyRouter); 
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URL;

// Connect to MongoDB database
connectDb(dbUrl)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
