
import { useEffect, useState } from "react"
import axios  from "axios";
import { useQuery } from "react-query";
import { UserContext } from "../../../../Context/Context"
import { useContext } from "react";

function Symbol ({getSymbol}){
    const[ selectedValue , setSelectedValue]=useState("")

    const userState =useContext(UserContext)
    
    userState.setUserSymbol(selectedValue);

    
     
    const GetSybmol = async () => {
        const response = await axios.get('/api/optionChain/all-symbol');
        return response.data;
      };

      const { data:symbol , error, isLoading } = useQuery('symbol', GetSybmol);



      const getLotBySymbol = () => {
        const item = symbol?.find(obj => obj.symbol === selectedValue);
        return item ? item.lot : null;
    };


    userState.setLot(getLotBySymbol)

      function sortByCategoryAndName(array) {
        return array?.sort((a, b) => {
           
            if (a.category < b.category) {
                return -1;
            }
            if (a.category > b.category) {
                return 1;
            }
    
           
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }

    const sortedData = sortByCategoryAndName(symbol);



      useEffect(()=>{

        
         getSymbol(selectedValue)
         getLotBySymbol(selectedValue)

      },[selectedValue ])
      

 
  

    return (

        <select className='bg-slate-900 px-2 py-[2px]  text-slate-300 mx-3 cursor-pointer'
            
        onChange={(e)=>setSelectedValue(e.target.value)}>

            {sortedData?.map((item, index)=>{
                return(
                    <option key={index} value={item.symbol} >{item.symbol}</option>
                )
            })}
      
         </select>


    )
}

export default Symbol