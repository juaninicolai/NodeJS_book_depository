import express from "express";
const app = express();
app.use(express.json());

let corsOptions = {
  origin: ["http://localhost:8080"],
};

import cors from "cors";
app.use(cors(corsOptions));

// import authRoutes from "./routers/authRoutes.js";
// app.use("/auth/login", authRoutes);

import booksRoutes from "./routers/booksRoutes.js";
app.use("/api", booksRoutes);

import mailRouter from "./routers/mailRouter.js";
app.use("/api/sendmail", mailRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
