import express, { Request, Response } from "express";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.get("/", (req: Request, res: Response<{ msg: string }>) => {
  res.json({
    msg: "Welcome to my chat app server",
  });
});

httpServer.listen(5000);
