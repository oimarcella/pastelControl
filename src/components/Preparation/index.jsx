import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import socketServer from './../../socket.js'
import styles from './index.module.css';

const socket = io(socketServer);

const Preparation = () => {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      document.title = "Preparação - PastelControl";

      socket.emit("getOrders");

      socket.on("updateOrders", (data) => {
        setOrders(data);
      });
  
      return () => {
        socket.off("updateOrders");
      };
    }, []);
  
    const markAsDone = (index) => {
      socket.emit("orderReady", index);
    };
  
    return (
      <div className={`${styles['pc-container']} flex items-center flex-col`}>
        <h1 className="mb-4 text-2xl font-bold text-blue-500">Em preparação</h1>
        {orders.length === 0 && <p>Nenhum pedido no momento.</p>}
        {orders.map((order, index) => (
          <div key={index} className={`${styles.order} border p-3 mb-3 rounded bg-slate-100`}>
            <span className="text-blue-300 font-bold text-sm mb-3">Pedido #{index}</span>
            <h2 className="font-semibold"><span className="text-blue-500 text-lg font-bold">{order.client}</span></h2>
            <ul className="ml-4 list-disc">
              {order.items.map((item, i) => (
                <li key={i} className="text-lg">{item.quantity}x {item.flavor}</li>
              ))}
            </ul>
            <button
              className="bg-green-600 text-white px-3 py-2 mt-5"
              onClick={() => markAsDone(index)}
            >
              Pedido Pronto
            </button>
          </div>
        ))}
      </div>
    );
  }

  export default Preparation;