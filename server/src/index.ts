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

interface User {
  username: string;
  id: string;
}

let online_users: Array<User> = [];

// Connecting to socket
io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("join", (payload) => {
    io.emit("user-changed", { value: `${payload.name} just joined` });

    online_users.push({ username: payload.name, id: socket.id });
  });

  socket.on("message", (payload) => {
    console.log(payload);

    io.emit("message-back", payload);
  });

  socket.on("disconnect", () => {
    const user = online_users.find((user) => user.id === socket.id);

    if (typeof user?.username !== "undefined") {
      console.log({ value: `${user?.username} just got disconnected` });
      io.emit("user-changed", {
        value: `${user?.username} just got disconnected`,
      });

      online_users = online_users.filter((user) => user.id !== socket.id);
    }
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
