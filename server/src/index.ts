import express from "express";
import cors from "cors";
import "dotenv/config";

import { Server } from "socket.io";

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

interface IMessage {
  username: string;
  message: string;
  time: string;
  mine?: boolean;
  images?: string[];
}

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 1000 * 1024 * 1024
});

io.on("connection", (socket) => {
  socket.on("chat_message", (message: IMessage) => {
    socket.broadcast.emit("chat_message", message);
  });
});
