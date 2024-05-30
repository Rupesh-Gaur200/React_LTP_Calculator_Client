import { StrictMode, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login (){
     
    const [userName , setUsername] =useState("")

    const [Password , setPassword] = useState("")
   
     const navigate =useNavigate()
  

     const userNamee = 'ashwanichaubey28@gmail.com'; // Replace with actual username
     const Passwordd = 'Ashwani@123'; // Replace with actual password
     const credentials = btoa(`${userName}:${Password}`);
     console.log(`Basic ${credentials}`);
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
          
          
        } catch (error) {
          console.error('Error:', error.response ? error.response.statusText : error.message);
        }
      };

     
      
     
  



    return (
        <div className=" W-full h-screen bg-[#212529] flex  flex-col justify-center items-center">
            <div className="py-5">
                <a>
                    <img src="https://alpha.ltpcalculator.com/theme/images/logoltp.png"></img>
                </a>
            </div>
            
        <div className="w-1/3 h-1/2 bg-[#fff] flex flex-col justify-center items-center rounded-md shadow-slate-400 shadow-lg">
            
            <form className="flex flex-col  w-[80%] h-[90%] items-center justify-evenly ">
                <label className="text-2xl font-semibold">Login to Your Account </label>
                <input className="w-full h-14 border-2 border-black px-4 rounded-md" type="text" placeholder="UserName" value={userName} onChange={(e)=>{setUsername(e.target.value)}}></input>
                <input className="w-full h-14 border-2 border-black px-4  rounded-md" type='text' placeholder="Password" value={Password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                <div className="w-full  flex justify-between items-center">
                      <a className="text-[#ff5a00]">Forget Password ?</a>
                      <button onClick={handleClick} className=" w-24 h-10 bg-[#ff5a00] rounded-md">Login</button>
                    </div>
               

            </form>

               

        </div>



  </div>   
    )
}

export default Login