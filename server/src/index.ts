import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
});

app.get("/", (req: Request, res: Response<{ msg: string }>) => {
  res.json({
    msg: "Welcome to my chat app server",
  });
});

httpServer.listen(5000, () => console.log("Server listening on port 5000"));
