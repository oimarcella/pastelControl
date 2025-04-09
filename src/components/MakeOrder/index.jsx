import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import socketServer from './../../socket.js'
import './index.module.css';

const socket = io(socketServer);
const flavors = ["Carne", "Queijo", "Frango", "Pizza", "Chocolate"];

const MakeOrder = () => {
  const [client, setClient] = useState("");
  const [quantity, setQuantity] = useState({});

  useEffect(()=>{
    document.title = "Novos pedidos - PastelControl";
  }, [])

  const handleQuantityChange = (flavor, value) => {
    setQuantity({ ...quantity, [flavor]: parseInt(value) || 0 });
  };

  const handleSubmit = () => {
    if (!client) return alert("Digite o nome do cliente");
    const order = {
      client,
      items: flavors
        .filter((item) => quantity[item] > 0)
        .map((item) => ({ flavor:item, quantity: quantity[item] })),
    };
    if (order.items.length === 0) return alert("Selecione ao menos 1 pastel");
    socket.emit("newOrder", order);
    setClient("");
    setQuantity({});
  };

  return (
    <div className="pc-container flex flex-col  items-center">
      <h1 className="mb-4 text-2xl font-bold text-blue-500">Novo Pedido</h1>
      <input
        className="p-2 mb-2 block"
        placeholder="Nome do cliente"
        value={client}
        onChange={(e) => setClient(e.target.value)}
      />

        <h1 className="mt-3 mb-4 text-lg font-bold text-blue-500 ">Sabores:</h1>
        <div className="flavors flex flex-row flex-wrap">
            {flavors.map((flavor) => (
                <div key={flavor} className="mb-2 mx-4">
                <label>{flavor}</label>
                <input
                    type="number"
                    className="ml-2 p-1 w-16"
                    placeholder="0"
                    value={quantity[flavor] || ""}
                    onChange={(e) => handleQuantityChange(flavor, e.target.value)}
                />
                </div>
            ))}
        </div>
      <button className="bg-green-500 text-white px-4 py-2 mt-4" onClick={handleSubmit}>
        Enviar Pedido
      </button>
    </div>
  );
}

export default MakeOrder;