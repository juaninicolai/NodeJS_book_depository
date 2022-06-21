import express from "express";
const app = express();
app.use(express.json());

let corsOptions = {
  origin: ["http://localhost:8080"],
};

import cors from "cors";
app.use(cors(corsOptions));

import authRoutes from "./routers/authRoutes.js";
app.use("/auth", authRoutes);

import booksRoutes from "./routers/booksRoutes.js";
app.use("/api", booksRoutes);

import mailRouter from "./routers/mailRouter.js";
app.use("/api/sendmail", mailRouter);

//db connection
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
let uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
