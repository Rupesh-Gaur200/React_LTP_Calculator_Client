
import { useEffect, useState } from "react"
import axios  from "axios";
import { useQuery } from "react-query";

function Symbol (){
    const[ selectedValue , setSelectedValue]=useState("")
     
    const GetSybmol = async () => {
        const response = await axios.get('/api/optionChain/all-symbol');
        return response.data;
      };


      useEffect(()=>{

        const { data:symbol , error, isLoading } = useQuery('symbol', GetSybmol);
      })
      

 
  

    return (

        <select className='bg-slate-900 px-2 py-[2px] rounded-md  text-slate-300 mx-3 cursor-pointer'
            
        onChange={(e)=>setSelectedValue(e.target.value)}>

            {symbol?.map((item, index)=>{
                return(
                    <option value={item.symbol}>{item.symbol}</option>
                )
            })}
      
         </select>


    )
}

export default Symbol