
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState , useEffect} from 'react';
import Symbol from './Button/Symbol';


function BottomNavbar (){

       

    const [value , setValue]=useState("")
    
    function getSymbol (selectedValue){

      setValue(selectedValue)
      value.toString().toUpperCase()

    }
   
  
       
    const GetExpiryDate = async ()=>{
      try {
        console.log("Making API call with value:", value); 
        const response = await axios.get(`/api/optionChain/symbol-expiry?symbol=${value}`);
        console.log("API Response:", response.data); 
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
        <div className='bg-slate-200 w-full h-10 px-5 flex items-center '>

        <div className=''>
           
            <Symbol getSymbol={getSymbol}></Symbol>


             {/* <select className='bg-slate-900 px-2 py-[2px] rounded-md  text-slate-300 mx-3 cursor-pointer'> 
              
              {data?.map((item,index)=>{
                
                return(
                    <option value="TataSteel">{item}</option>

                )

              })}
              
              
            </select> */}


             <select className='bg-slate-900 px-2 py-[2px] rounded-md text-slate-300 mx-3 cursor-pointer'>  <option value="TataSteel">ATM</option>
            <option value="All">All</option>
            </select>


             <select className='bg-slate-900 px-2 py-[2px] rounded-md text-slate-300 mx-3 cursor-pointer'>  <option value="TataSteel">Spot</option>
          </select>

        </div>

    </div>

    )

}

export default BottomNavbar