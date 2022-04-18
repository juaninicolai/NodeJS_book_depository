import express from "express";
const app = express();
app.use(express.json());

let corsOptions = {
  origin: ["http://localhost:8080"],
};

import cors from "cors";
app.use(cors(corsOptions));

import helmet from "helmet";
app.use("/api", helmet());

import authRouter from "./routers/authRouter.js";
app.use("/auth/login", authRouter);

import booksRouter from "./routers/booksRouter.js";
app.use("/api/books", booksRouter);

import mailRouter from "./routers/mailRouter.js";
import session from "express-session";
app.use("/api/sendmail", mailRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
