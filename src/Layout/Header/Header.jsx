
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
function Header (){

  const navigate = useNavigate()
    function handleLogout(e){
     navigate("/")
    }

           
    return(
        <div>

        {/* Upper nav-bar Start Here */}
        <div className="w-full h-5 bg-slate-600 flex py-4 px-10  items-center">
            <div className="flex items-center">
            <h1 className="text-[#fff] text-sm">Welcome Back </h1>
            <strong className="text-[#fff] mx-2"> Rupesh Gaur</strong>
            </div>
            <h1 className="text-[#fff] text-sm">! Your Subscription will be Expire on </h1>
            <strong className="mx-2 text-[#fff]">2024-10-12</strong>
            
        </div>

        {/* Upper Navbar ends here */}

        {/* Middle Navbar Start here */}
        
        <div className="w-screen bg-[#212529] h-20 px-20 flex justify-between items-center ">

          <div className="h-full">
         <img src="https://alpha.ltpcalculator.com/theme/images/logoltp.png" className=" h-full"></img>
         </div>

         <div className='flex gap-14'>

            <Tooltip title="UserProfile " arrow="down">
              <Avatar  className="hover:cursor-pointer" alt="Remy Sharp" src="https://media.licdn.com/dms/image/D4D03AQG70Kdxbvq8dA/profile-displayphoto-shrink_800_800/0/1689831785402?e=1722470400&v=beta&t=JBCU2QbNbivxPtml1WDK4x5xarDYsKlb2UlWGw9J4pk" />
              </Tooltip>

              <div className='flex justify-center items-center px-4  '>
              <button onClick={handleLogout} className='text-slate-200'>
               Logout  <LogoutIcon className='scale-x-[-1]'/> </button>
              </div>
         </div>

        </div>

        {/* Middle Navbar Ends Here */}

        <div className='bg-slate-200 w-full h-10 px-10 flex items-center gap-4'>

            <div className=''>
                <select className='bg-slate-900  text-slate-300 mx-5' >
                <option value="TataSteel">TataSteel</option>
                <option value="saab">Nifity50</option>
                <option value="mercedes">Adani ports</option>
                <option value="audi">Hdfc</option>
                 </select>


                 <select className='bg-slate-900  text-slate-300 mx-5'>  <option value="TataSteel">TataSteel</option>
                <option value="saab">Nifity50</option>
                <option value="mercedes">Adani ports</option>
                <option value="audi">Hdfc</option>
                </select>
                 <select className='bg-slate-900  text-slate-300 mx-5'>  <option value="TataSteel">TataSteel</option>
                <option value="saab">Nifity50</option>
                <option value="mercedes">Adani ports</option>
                <option value="audi">Hdfc</option></select>
                 <select className='bg-slate-900  text-slate-300 mx-5'>  <option value="TataSteel">TataSteel</option>
                <option value="saab">Nifity50</option>
                <option value="mercedes">Adani ports</option>
                <option value="audi">Hdfc</option></select>

            </div>

        </div>





        </div>
    )

}

export default Header 