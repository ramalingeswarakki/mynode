import express, { Request, Response,Application } from "express";
import booksroute from "./routes/booksroute";
import userRoute from "./routes/userRoute";
import mongoose from "mongoose";
import cors from "cors";
import dotenv, { config } from "dotenv";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(
  express.urlencoded({
  extended: true,
  })
 );
app.use("/api",booksroute)
app.use("/api",userRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Node.js + TypeScript API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});