
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import Symbol from './Button/Symbol';


function BottomNavbar (){

       

       
   
       
    const GetExpiryDate = async ()=>{
        const response = await axios.get('/api/optionChain/symbol-expiry',{
            params:{
                symbol:"TATAPOWER"
            }
        })

       console.log(response.data)
    }

    // const { data, error, isLoading } = useQuery('symbol', GetSybmol); 

    // const expiryData=useQuery(['expiry','symbol'], GetExpiryDate , selectedValue)
    // console.log(expiryData.data)

   

    // Fetch expiry data when selectedValue changes
    const { data: expiryData } = useQuery(
      ['expiry'],
      GetExpiryDate
    
    );
  
 


     
      
    
  
    return(
        <div className='bg-slate-200 w-full h-10 px-5 flex items-center '>

        <div className=''>
           
            <Symbol></Symbol>


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