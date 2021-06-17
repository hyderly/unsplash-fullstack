// Import Packages
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import errorHandler from "./middlewares/errorHandler.js";

// Import Modules
import connectDB from "./config/db.js";

// Import Routes
import userRoute from "./routes/userRoute.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("App is running ... ");
});

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use("/api/users", userRoute);

app.use(errorHandler);

const PORT = 5000;

app.listen(
  PORT,
  console.log(`Server is running on ${process.env.NODE_ENV} at port ${PORT}`)
);
