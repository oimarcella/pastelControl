import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import MakeOrder from "./components/MakeOrder";
import Preparation from "./components/Preparation";
import Configuration from "./components/Configuration";

export default function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-2">
        <Link to="/" className="p-2 link">Fazer novo pedido</Link>
        <Link to="/preparacao" className="p-2 link">Ver fila de preparação</Link>
        <Link to="/configuracao" className="p-2 link">Configuração</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MakeOrder />} />
        <Route path="/preparacao" element={<Preparation />} />
        <Route path="/configuracao" element={<Configuration />} />
      </Routes>
    </Router>
  );
}
