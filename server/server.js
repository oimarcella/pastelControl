import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite
    methods: ["GET", "POST"]
  }
});

let orders = [];

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.emit("updateOrders", orders);
  
  socket.on("getOrders", () => {
    socket.emit("updateOrders", orders);
  });

  socket.on("newOrder", (order) => {
    orders.push(order);
    io.emit("updateOrders", orders);
  });

  socket.on("orderReady", (index) => {
    orders.splice(index, 1);
    io.emit("updateOrders", orders);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

server.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
