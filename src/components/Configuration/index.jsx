import { useRef, useState } from 'react';
import styles from './index.module.css';
import useFlavors from '../../../context/FlavorsContext';

const Configuration = () =>{
    const {flavors, addNewFlavor, deleteFlavor} = useFlavors();
    const [, setFlavors] = useState([]);
    const inputFlavorRef = useRef();

    document.title = "Configurações - PastelControl";

    function handleSubmit(event){
        event.preventDefault();
        const aux = inputFlavorRef.current.value;

        if(inputFlavorRef.current.value){
            setFlavors(prev => [...prev, aux]);
            addNewFlavor(aux);
        }

        cleanField();
    }

    function handleRemove(flavor){
        if(flavor){
            setFlavors(prev => [...prev.filter(item=> item!== flavor)]);
            deleteFlavor(flavor);
        }

        cleanField();
    }

    function cleanField (){
        inputFlavorRef.current.value = "";
    }

    return <div className={`${styles['pc-container']} bg-gray-50`}>
    <h1 className="mb-6 text-3xl font-bold text-blue-600">Configurações</h1>
    
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="mb-5 text-xl font-medium text-slate-800">Adicionar novo sabor</h3>
  
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">
        <input 
          type="text" 
          placeholder="Qual será o novo sabor?" 
          ref={inputFlavorRef} 
          className="flex-grow py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md transition-colors duration-200 font-medium">
          Adicionar
        </button>
      </form>
  
      {flavors.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-medium text-slate-700 mb-3">Sabores disponíveis</h4>
          <ul className="bg-white rounded-md overflow-hidden divide-y divide-gray-100">
            {flavors.map(flavor => (
              <li key={`${flavor}-${Math.random()}`} className="hover:bg-gray-50">
                <div className="flex justify-between items-center p-3">
                  <span className="text-slate-700">{flavor}</span>
                  <button 
                    className="p-2 rounded bg-red-600 hover:bg-red-700 text-white text-xs transition-colors duration-200"
                    onClick={() => handleRemove(flavor)}
                  >
                    Apagar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <small className="text-blue-600 mt-5" style={{position:"absolute", bottom:"10px", textAlign:"center",width:"90%"}}><a href="https://github.com/oimarcella">@Desenvolvedor</a></small>
  </div>
}
export default Configuration;