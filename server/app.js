import express from "express";
const app = express();
app.use(express.json());

let corsOptions = {
	origin: ["http://localhost:8080"],
	credentials: true,
};

import cors from "cors";
app.use(cors(corsOptions));

import cookieParser from "cookie-parser";
app.use(cookieParser());

import http from "http";
const httpServer = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(httpServer, {
	cors: corsOptions,
});

io.on("connection", (socket) => {
	socket.on("reduceInventory", () => {
		io.emit("updateInventory");
	});
});

import authRoutes from "./routes/authRoutes.js";
app.use("/auth", authRoutes);

import booksRoutes from "./routes/booksRoutes.js";
app.use("/api", booksRoutes);

import mailRouter from "./routes/mailRouter.js";
app.use("/api/sendmail", mailRouter);

//would like to have this in a separate file
import "dotenv/config";
import mongoose from "mongoose";
let uri = process.env.MONGO_URI;
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
