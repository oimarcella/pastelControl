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
        const ordersOrdered  =  data.sort((x, y) => {
          if(x.isDone && !y.isDone) return 1;
          if(!x.isDone && y.isDone) return -1;
          return 0;
        });
        setOrders(ordersOrdered);
      });
  
      return () => {
        socket.off("updateOrders");
      };
    }, []);
  
    const markAsDone = (id) => {
      socket.emit("orderReady", id);
    };
  
    return (
      <div className={`${styles['pc-container']} flex items-center flex-col bg-gray-50`}>
        <h1 className="mb-6 text-3xl font-bold text-blue-600">Em Preparação</h1>
        
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 bg-white rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <p className="text-lg text-gray-500">Nenhum pedido no momento.</p>
          </div>
        ) : (
          <div className="w-full max-w-3xl space-y-6">
            {orders.map((order, index) => (
              <div 
                key={index} 
                className={`${styles.order} border border-gray-200 p-6 rounded-lg bg-white shadow-md transition-all hover:shadow-lg
                ${order.isDone && styles['orderDone']}
                `}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-full text-sm">
                    Pedido #{order.id}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Cliente: <span className="text-blue-600">{order.client}</span>
                </h2>
                
                <div className="bg-gray-50 p-4 rounded-md mb-5">
                  <h3 className="font-medium text-gray-700 mb-2">Itens:</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="bg-blue-50 text-blue-700 font-medium rounded-full w-7 h-7 flex items-center justify-center mr-3">
                          {item.quantity}
                        </span>
                        <span className="text-gray-800">{item.flavor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {!order.isDone  && <div className="flex justify-end">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2 rounded-md shadow-sm transition-colors duration-200 flex items-center"
                    onClick={() => markAsDone(order.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Pedido Pronto
                  </button>
                </div>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  export default Preparation;