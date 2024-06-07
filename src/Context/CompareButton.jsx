
import { createContext , useState } from "react";

export const CompareContext = createContext(null);

export const CompareContextProvider =(props)=>{

    const [compareValue , setCompareValue]=useState(null);


    return (
        <CompareContext.Provider value={{compareValue , setCompareValue}}>
       
         {props.children}     
        </CompareContext.Provider>
    )


}