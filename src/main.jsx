import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './index.css';
import { FlavorsProvider } from '../context/FlavorsContext.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FlavorsProvider>
      <App />
    </FlavorsProvider>
  </StrictMode>,
)
