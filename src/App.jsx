import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import MakeOrder from "./components/MakeOrder";
import Preparation from "./components/Preparation";
import Configuration from "./components/Configuration";

export default function App() {
  return (
    <Router>
     <header className="nav-container bg-blue-800">
        <div className="container mx-auto px-4">
          <nav className="flex flex-wrap items-center justify-between py-3">
            <div className="flex items-center">
              {/* Se você tiver um logo, pode adicioná-lo aqui */}
              <img src="/logo.jpg" alt="Logo" className={`mr-4 logo`} />
            </div>
            
            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                className={`px-4 py-2 text-slate-700 font-medium rounded-md transition-all duration-200 hover:bg-blue-50 nav-link`}
              >
                Fazer novo pedido
              </Link>
              <Link 
                to="/preparacao" 
                className={`px-4 py-2 text-slate-700 font-medium rounded-md transition-all duration-200 hover:bg-blue-50 nav-link`}
              >
                Ver fila de preparação
              </Link>
              <Link 
                to="/configuracao" 
                className={`px-4 py-2 text-slate-700 font-medium rounded-md transition-all duration-200 hover:bg-blue-50 nav-link`}
              >
                Configuração
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<MakeOrder />} />
        <Route path="/preparacao" element={<Preparation />} />
        <Route path="/configuracao" element={<Configuration />} />
      </Routes>
    </Router>
  );
}
