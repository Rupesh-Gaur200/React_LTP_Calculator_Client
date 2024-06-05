import { useQuery } from 'react-query';
import axios from 'axios';
import { useState , useEffect} from 'react';
import Symbol from './Button/Symbol';
import ExpiryDate from './Button/ExpiryDate';
import { UserContext } from '../../../Context/Context';
import { useContext } from 'react';
import LiveHistory from './Button/LiveHistory';

import Price_S from './Button/Price_S';
import CompareNavbar from './Button/CompareNavbar';
import FetchTime from './Button/FetchTime';

function BottomNavbar (){


    const [expiryDate , setExpiryDate]=useState([])  

    const [value , setValue]=useState("NIFITY")

    const userState = useContext(UserContext)
    
    function getSymbol (selectedValue){

      setValue(selectedValue)
      value.toString().toUpperCase()

    }
   
  
       
    const GetExpiryDate = async ()=>{
      try {
        // console.log("Making API call with value:", value); 
        const response = await axios.get(`/api/optionChain/symbol-expiry?symbol=${value}`);
        console.log("API Response:", response.data); 
        setExpiryDate(response.data)
        

    } catch (error) {
        console.error("Error fetching expiry date:", error);
    }
    }

    useEffect(() => {
      if (value) {
          GetExpiryDate();

      }
  }, [value]);

    // const { data, error, isLoading } = useQuery('symbol', GetSybmol); 

    // const expiryData=useQuery(['expiry','symbol'], GetExpiryDate , selectedValue)
    // console.log(expiryData.data)

   

    // Fetch expiry data when selectedValue changes
    // const { data: expiryData } = useQuery(
    //   ['expiry'],
    //   GetExpiryDate
    
    // );
  
 


     
      
    
  
    return(
        <div className='bg-slate-200 w-full h-10  py-3 flex items-center  justify-between'>
         
        
      
      <div className='flex items-center gap-[6px]'>
      <LiveHistory></LiveHistory>
        
        <Symbol getSymbol={getSymbol}></Symbol>
        <ExpiryDate expiryDate={expiryDate}></ExpiryDate>

         <select className='bg-slate-900 px-2 py-[3px] rounded-[3px] text-slate-300 font-bold text-center cursor-pointer'>  <option value="TataSteel">ATM</option>
        <option value="All">All</option>
        </select>

         <select className='bg-slate-900 px-2 py-[3px] rounded-[3px] text-slate-300 font-bold text-center cursor-pointer'>  <option value="TataSteel">Spot</option>
      </select>

      <Price_S></Price_S>
   
    </div>     
    
    <div> <FetchTime></FetchTime>   </div>
    
        <CompareNavbar></CompareNavbar>
   
    </div>

    )

}

export default BottomNavbar