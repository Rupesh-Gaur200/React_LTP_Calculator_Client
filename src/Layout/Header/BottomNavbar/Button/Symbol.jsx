
import { useEffect, useState } from "react"
import axios  from "axios";
import { useQuery } from "react-query";
import { UserContext } from "../../../../Context/Context"
import { useContext } from "react";

function Symbol ({getSymbol}){
    const[ selectedValue , setSelectedValue]=useState("NIFTY")

    const userState =useContext(UserContext)
    
    userState.setUserSymbol(selectedValue);

    const userName="ltpjava"
    const Password="R$az!fQ?ui6%I5h&kn1"

    const credentials = btoa(`${userName}:${Password}`);
     
    const GetSybmol = async () => {
        const response = await axios.get('/api/optionChain/all-symbol',{
      
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': '*/*',
        },

      });
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

        <select value={selectedValue} className='bg-slate-900 px-[2px] py-[3px] rounded-[3px] font-bold text-center text-slate-300  cursor-pointer'
            
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