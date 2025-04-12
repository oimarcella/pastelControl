import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", 'https://pastel-control.vercel.app/', '*'], // Vite
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

  socket.on("orderReady", (id) => {
    orders.map(item=>{
       if(item.id === id) {
        console.log(item)
        item.isDone = true;
      }
    })
    io.emit("updateOrders", orders);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

const PORT = 3001
server.listen(PORT, () => {
  console.log("✌️😎 - Estou online ");
  console.log(`Servidor rodando na porta ${PORT}`);
});
