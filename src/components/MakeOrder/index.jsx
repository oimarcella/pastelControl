import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { io } from "socket.io-client";
import socketServer from './../../socket.js'
import './index.module.css';
import style from './index.module.css';
import useFlavors from "../../../context/FlavorsContext.js";

const socket = io(socketServer, {
  transports: ["websocket"],
});

const MakeOrder = () => {
  const [orders, setOrders] = useState([]);
  const {flavors} = useFlavors();
  const [client, setClient] = useState("");
  const [quantity, setQuantity] = useState({});

  useEffect(()=>{
    document.title = "Novos pedidos - PastelControl";

    socket.emit("getOrders");

    socket.on("updateOrders", (data) => {
      const ordersOrdered  =  data.sort((x, y) => {
        if(x.isDone && !y.isDone) return 1;
        if(!x.isDone && y.isDone) return -1;
        return 0;
      });
      setOrders([...ordersOrdered]);
    });
  }, [])

  const handleQuantityChange = (flavor, value) => {
    setQuantity({ ...quantity, [flavor]: parseInt(value) || 0 });
  };

  const handleSubmit = () => {
    if (!client) return alert("Digite o nome do cliente");
    const order = {
      client,
      isDone: false, 
      id: orders.length+1,
      hour: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'}),
      items: flavors
        .filter((item) => quantity[item] > 0)
        .map((item) => ({ flavor:item, quantity: quantity[item] })),
    };
    
    if (order.items.length === 0) return alert("Selecione ao menos 1 pastel");

    setOrders(prev => [...prev, order]);
    
    socket.emit("newOrder", order);
    setClient("");
    setQuantity({});
  };

  return (
    <div className={` ${style['pc-container']} flex flex-col items-center bg-gray-50`}>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Novo Pedido</h1>
        
        <div className="mb-6">
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">Nome do cliente</label>
          <input
            id="clientName"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Digite o nome do cliente"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </div>

        <h2 className="text-xl font-semibold text-blue-600 mb-4">Sabores</h2>
        {flavors.length? 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {flavors.map((flavor) => (
              <div key={flavor} className="bg-blue-50 p-4 rounded-md hover:shadow-sm transition-all">
                <label className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">{flavor}</span>
                  <input
                    type="number"
                    className="ml-3 p-2 w-20 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                    value={quantity[flavor] || ""}
                    onChange={(e) => handleQuantityChange(flavor, e.target.value)}
                  />
                </label>
              </div>
            ))}
          </div>
        :
          <p>Nada cadastrado ainda 🫤. (Cadastre em: <Link   to="/configuracao">Configuração</Link>)</p>
        }
        
        <div className="flex justify-center mt-5">
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-md shadow-sm transition-colors duration-200 flex items-center"
            onClick={handleSubmit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Enviar Pedido
          </button>
        </div>
      </div>

      <small className="text-blue-600 mt-5" style={{position:"absolute", bottom:"10px"}}><a href="https://github.com/oimarcella">@Desenvolvedor</a></small>
    </div>
  );
}

export default MakeOrder;