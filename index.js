import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import userRoute from "./routes/user.route.js";
import express from "express";
import cookieParser from "cookie-parser";

dotenv.config({});

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT;

//apis
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
