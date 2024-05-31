import { StrictMode, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import BgImage from './LoginPageAssets/newloginbg.jpg'

import sirImage from './LoginPageAssets/sir3.png'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Login (){
     
    const [userName , setUsername] =useState("")

    const [Password , setPassword] = useState("")
   
     const navigate =useNavigate()
  


     const credentials = btoa(`${userName}:${Password}`);
    
  async function handleClick(e){
          
        e.preventDefault()
     

        try {
          const response = await axios.get('/api/currentUser',{
      
            headers: {
              'Authorization': `Basic ${credentials}`,
              'Content-Type': '*/*',
            },

          });
      console.log(response)
      if(response.status==200){
        navigate('/home')
      }
      
          
          
        } catch (error) {
          console.error('Error:', error.response ? error.response.statusText : error.message);
        }


      

      };

     
      
     
  



    return (
        <div className=" W-full h-screen bg-[url('https://ltp.investingdaddy.com/assets/images/newloginbg.jpg')] px-20 py-5">
   

            <div className="w-[65%] relative  flex justify-between mb-3">

              <div className="w-48   ">
                <a>
                    <img className="" src="https://alpha.ltpcalculator.com/theme/images/logoltp.png"></img>
                </a>
                </div>

                <div className="  absolute right-0 -top-5">

                <img className="w-[105px]"  src={sirImage}></img>
                </div>
            </div>
            

            <div className="flex  w-full justify-between gap-5" >


            <div  className="bg-slate-200 w-[65%]   ">






            </div>


    <div className="w-1/3 h-full  flex flex-col gap-4 items-center">


        <div className="w-full h-[400px] bg-[#fff]  flex flex-col justify-center items-center rounded-2xl shadow-slate-400 shadow-lg">
            
            <form onSubmit={handleClick} className="flex flex-col  w-[80%] h-[90%] items-center justify-evenly ">

                <label className="text-2xl font-semibold">Login to Your Account </label>
                <input   required title="Please Enter Your UserName" className="w-full h-14 border-2 border-black px-4 rounded-md" type="text" placeholder="UserName" value={userName} onChange={(e)=>{setUsername(e.target.value)}}></input>
                <input required title="Please Enter Your Password" className="w-full h-14 border-2 border-black px-4  rounded-md" type='text' placeholder="Password" value={Password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                <div className="w-full  flex flex-col justify-between items-center gap-4">
                <FormControlLabel required control={<Checkbox />} label="I have read and agreed to Terms & Conditions" />
                      <button type="submit" className=" w-24 h-10 bg-[#ff5a00] rounded-md">Login</button>
                    </div>
               

            </form>
            </div>

            <iframe className="rounded-lg" width="432" height="220" src="https://www.youtube.com/embed/HVKrquUilDw" title="LTP CALCULATOR ON ZEE BUSINESS #Nifty #Stocks #Option #ltpcalculator  #LTPCALCULATORONZEEBUSINESS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        </div>
          
      
           

        </div>
 
    
  </div>   
    )
}

export default Login