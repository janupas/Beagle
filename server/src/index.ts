import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

// Connecting to socket
io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("message", (payload) => {
    console.log(payload);

    io.emit("message-back", payload);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

app.get("/", (req: Request, res: Response<{ msg: string }>) => {
  res.json({
    msg: "Welcome to my chat app server",
  });
});

httpServer.listen(process.env.PORT, () =>
  console.log("Server listening on port " + process.env.PORT)
);
