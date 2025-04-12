import { createContext, ReactNode, useContext, useState } from "react";

type FlavorsContextT = {
    flavors: string[];
    addNewFlavor: (flavor: string) => void;
    deleteFlavor: (flavor: string) => void;
  }

interface IFlavorsProviderProps {
    children: ReactNode;
}

const FlavorsContext = createContext<FlavorsContextT | undefined>(undefined);

export const FlavorsProvider = (props:IFlavorsProviderProps)=>{
    const [flavors, setFlavors]= useState<string[]>(["Queijo", "Carne", "Pizza"]);

    function addNewFlavor(newFlavor:string){
        setFlavors(previous => [...previous, newFlavor])
    }

    function deleteFlavor(flavor:string){
        setFlavors(previous=> previous.filter(item =>  item!== flavor));
    }

    return (
        <FlavorsContext.Provider value={{flavors, addNewFlavor, deleteFlavor}}>
            {props.children}
        </FlavorsContext.Provider>
    )
};

 const useFlavors = () => {
    const context = useContext(FlavorsContext);
    if (!context) throw new Error("useFlavors precisa estar dentro de um FlavorsProvider");
    return context;
  };

  export default useFlavors;